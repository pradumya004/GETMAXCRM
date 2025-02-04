import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import Sidebar from "../components/sidebar/Sidebar";
import DashboardContent from "../components/content/DashboardContent";
import EmployeeList from "../components/content/organisation/EmployeeList";
import ActivityPage from "../components/content/organisation/ActivityPage";
import HelpContent from "../components/content/HelpContent";
import IncomeContent from "../components/content/IncomeContent";
import ProfileContent from "../components/content/ProfileContent";
import AllProductsContent from "../components/content/product/AllProductsContent";
import CategoriesContent from "../components/content/product/CategoriesContent";
import OrdersContent from "../components/content/product/OrdersContent";

const DashboardPage = () => {
  const location = useLocation();
  const defaultItem = location.state?.selectedItem || "profile"; // Check for selectedItem from state
  const [selectedItem, setSelectedItem] = React.useState(defaultItem);

  const handleItemSelection = (itemKey) => {
    setSelectedItem(itemKey);
  };

  const contentMap = {
    dashboard: <DashboardContent />,
    employeeList: <EmployeeList />,
    activityTracker: <ActivityPage />,
    help: <HelpContent />,
    income: <IncomeContent />,
    profile: <ProfileContent />,
    allProducts: <AllProductsContent />,
    categories: <CategoriesContent />,
    orders: <OrdersContent />,
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar onItemSelect={handleItemSelection} />

      {/* Main content */}
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="mt-4 text-gray-600">Welcome to your dashboard.</p>

          {/* Render content based on selected item */}
          {contentMap[selectedItem] || (
            <div className="p-8">Content for {selectedItem}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
