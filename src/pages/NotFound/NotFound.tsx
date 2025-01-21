import { Link } from "react-router-dom";
import { KBrandIcon } from "../../assets/svg/Alert";
const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center gap-6 items-center">
      <KBrandIcon />
      <h1 className="font-bricolage text-3xl">404 - Page Not Found</h1>
      <p className="font-workSans">The requested page does not exist.</p>

      <Link className="main-btn" to="/">
        Go back Home
      </Link>
    </div>
  );
};

export default NotFound;
