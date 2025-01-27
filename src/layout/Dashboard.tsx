import Sidebar from "../components/Sidebar/Sidebar";
import { DashboardLayoutProps } from "../interfaces/Global";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className=" w-full  gap-8  flex flex-col bg-white">
      <div className="flex">
        <section className="fixed left-0 top-0 w-72 min-h-screen bg-white  rounded-md transition-all duration-300">
          <Sidebar />
        </section>

        <aside className="ml-72 w-full overflow-y-auto bg-pryColor-Light">
          {children}
        </aside>
      </div>
    </main>
  );
};

export default DashboardLayout;
