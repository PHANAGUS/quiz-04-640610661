import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ ok: false, message: "Permission denied" });
    }

    //compute DB summary
    const all = readUsersDB();
    const users = all.filter((x) => !x.isAdmin);
    const admins = all.filter((x) => x.isAdmin);
    let total = 0;
    for (let i = 0; i < users.length; i++) {
      total += users[i].money;
    }

    return res.json({
      ok: true,
      userCount: users.length,
      adminCount: admins.length,
      totalMoney: total,
    });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
