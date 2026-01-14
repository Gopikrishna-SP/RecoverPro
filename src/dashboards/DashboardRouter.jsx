import SuperAdminDashboard from "./SuperAdminDash";
import BankAdminDashboard from "./BankAdminDash";
import VendorAdminDashboard from "./VendorAdminDash";
import FEDashboard from "./FEDash";

export default function DashboardRouter() {
  // TEMP role (no JWT yet)
  const role = "field_executive"; // Change this value to test different dashboards

  switch (role) {
    case "super_admin":
      return <SuperAdminDashboard />;

    case "bank_admin":
      return <BankAdminDashboard />;

    case "vendor_admin":
      return <VendorAdminDashboard />;

    case "field_executive":
      return <FEDashboard />;

    default:
      return <div>No role assigned</div>;
  }
}
