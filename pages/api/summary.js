import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || !user.isAdmin)
      return res.status(403).json({ ok: false, message: "Permission denied" });

    const users = readUsersDB();
    let userC = 0;
    let adminC = 0;
    let totalM = 0;
    users.forEach((x) => {
      if (x.isAdmin) adminC++;
      else {
        userC++;
        totalM += x.money;
      }
    });
    return res.json({
      ok: true,
      userCount: userC,
      adminCount: adminC,
      totalMoney: totalM,
    });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
