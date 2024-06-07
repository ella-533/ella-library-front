
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { useVerifyIfUserIsLogged } from "../Utils/security-utils";


const DashboardPage = () => {
  useVerifyIfUserIsLogged();

  return (
    <>
     <HeaderAdmin />

      <h2>Vous êtes bien connecté en tant qu'admin</h2>
    </>
  );
};

export default DashboardPage;