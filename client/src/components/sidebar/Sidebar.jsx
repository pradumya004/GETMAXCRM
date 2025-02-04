import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import {
  FaHome,
  FaBox,
  FaUserAlt,
  FaWallet,
  FaQuestionCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onItemSelect }) => {
  const [activeItem, setActiveItem] = useState("Profile");
  const [openDropdown, setOpenDropdown] = useState("");
  const [user, setUser] = useState({ name: "Guest", role: "User", isAdmin: false }); // Default role and isAdmin
  const navigate = useNavigate();

  // Fetch user data from localStorage and check if the user is an admin
  useEffect(() => {const fetchUserData = async () => {
    const employeeId = localStorage.getItem("employeeId");
    if (employeeId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/employees/isAdminOrNot/${employeeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser({
          name: data.name || "Guest",
          isAdmin: data.isAdmin || false,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

    fetchUserData();
  }, []);

  const navigationItems = [
    { label: "Dashboard", icon: <FaHome />, key: "dashboard" },
    { label: "Profile", icon: <FaUserAlt />, key: "profile" },
    {
      label: "Product",
      icon: <FaBox />,
      hasDropdown: true,
      key: "product",
      subItems: [
        { label: "All Products", key: "allProducts" },
        { label: "Categories", key: "categories" },
        { label: "Orders", key: "orders" },
      ],
    },
    { label: "Income", icon: <FaWallet />, key: "income" },
    // Organisation section - visible only to Admins
    ...(user.isAdmin
      ? [
          {
            label: "Organisation",
            icon: <RiDashboardHorizontalLine />,
            hasDropdown: true,
            key: "organisation",
            subItems: [
              { label: "Employee List", key: "employeeList" },
              { label: "Activity Tracker", key: "activityTracker" },
            ],
          },
        ]
      : []),
    { label: "Help", icon: <FaQuestionCircle />, key: "help" },
  ];

  const handleItemClick = (item) => {
    if (item.hasDropdown) {
      setOpenDropdown(openDropdown === item.label ? "" : item.label);
      setActiveItem(item.label);
    } else {
      setActiveItem(item.label);
      setOpenDropdown("");
      if (onItemSelect) onItemSelect(item.key);
    }
  };

  const handleSubItemClick = (parentLabel, subItemKey) => {
    setActiveItem(subItemKey);
    setOpenDropdown(parentLabel);
    if (onItemSelect) onItemSelect(subItemKey);
  };

  const handleLogout = () => {
    localStorage.removeItem("employeeId"); // Remove employeeId from localStorage
    localStorage.removeItem("userData"); // Remove userData from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <aside className="w-[250px] bg-white shadow-lg h-screen relative border-r border-gray-400">
      {/* Sidebar Header */}
      <div className="p-7 space-y-8">
        <div className="flex items-center gap-3">
          <MdSettings className="w-9 h-9" />
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-4">
          {navigationItems.map((item) => (
            <div key={item.key}>
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full flex justify-between items-center gap-3 py-2 px-3 rounded-md transition-all duration-300 ${
                  activeItem === item.label || openDropdown === item.label
                    ? "bg-blue-600 text-white"
                    : "text-[#9197b3] hover:text-gray-950 hover:font-bold hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.hasDropdown &&
                  (openDropdown === item.label ? (
                    <FaChevronDown className="ml-auto h-4 w-4" />
                  ) : (
                    <FaChevronRight className="ml-auto h-4 w-4" />
                  ))}
              </button>

              {/* Dropdown Items */}
              {item.hasDropdown && openDropdown === item.label && (
                <div className="mt-1 bg-gray-200 p-2 rounded-md space-y-2">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.key}
                      onClick={() =>
                        handleSubItemClick(item.label, subItem.key)
                      }
                      className={`w-full flex justify-start items-center px-3 py-2 rounded-md transition-all ${
                        activeItem === subItem.key
                          ? "bg-gray-400 text-black font-semibold"
                          : "text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <FaChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* User Profile (Bottom Section) */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300">
        <div className="flex items-center justify-between w-full p-4">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-left text-gray-700 hover:text-blue-600 hover:font-semibold"
          >
            Logout
          </button>

          {/* Settings Link */}
          <button
            onClick={() => {
              // Redirect or handle settings
            }}
            className="w-full text-left text-gray-700 hover:text-blue-600 hover:font-semibold"
          >
            Settings
          </button>
        </div>

        <div className="mt-3 text-center text-sm text-gray-500">
          <p>&copy; Dashboard. All rights reserved.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;