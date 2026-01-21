import SuperAdminDashboard from "./SuperAdminDash";
import BankAdminDashboard from "./BankAdminDash";
import VendorAdminDashboard from "./VendorAdminDash";
import FEDashboard from "./FEDash";

function getRoleFromToken() {
  // 🔥 MUST MATCH OTHER DASHBOARDS
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];

    // Base64URL → Base64 (IMPORTANT)
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));

    console.log("JWT ROLES:", decoded.roles); // 🔍 DEBUG
    return decoded.roles?.[0] || null;
  } catch (err) {
    console.error("JWT decode failed", err);
    return null;
  }
}

const ROLE_DASHBOARD_MAP = {
  ROLE_SUPER_ADMIN: SuperAdminDashboard,
  ROLE_BANK_ADMIN: BankAdminDashboard,
  ROLE_VENDOR_ADMIN: VendorAdminDashboard,
  ROLE_FIELD_EXECUTIVE: FEDashboard,
};

export default function DashboardRouter() {
  const role = getRoleFromToken();

  console.log("RESOLVED ROLE:", role); // 🔍 DEBUG

  if (!role) {
    return <div style={{ padding: 40 }}>Unauthorized – No role</div>;
  }

  const DashboardComponent = ROLE_DASHBOARD_MAP[role];

  if (!DashboardComponent) {
    return (
      <div style={{ padding: 40 }}>
        No dashboard mapped for role: {role}
      </div>
    );
  }

  return <DashboardComponent />;
}
