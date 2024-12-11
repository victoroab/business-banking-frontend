import Sidebar from "../components/Sidebar/Sidebar";
import { DashboardLayoutProps } from "../interfaces/Global";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className=" w-full  gap-8  flex flex-col bg-white">
      <div className="flex">
        <section
          className={` border rounded-md w-72 min-h-screen border-r bg-white transition-all duration-300 `}
        >
          <Sidebar />
        </section>
        <aside className="toggleSideBar?w-[85%] : w-[93%] transition-all duration-300 bg-pryColor-Light">
          {children}
        </aside>
      </div>
    </main>
  );
};

export default DashboardLayout;
