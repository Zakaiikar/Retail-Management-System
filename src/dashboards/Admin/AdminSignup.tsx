import Signup from "../../auth/Signup";
import AppLayout from "../../components/AppLayout";

export default function AdminSignup() {
  return (
    <AppLayout role="admin" title="Add Employee">
      {/* 
        We reuse Signup EXACTLY as-is.
        AuthLayout inside Signup stays unchanged.
        AppLayout adds the sidebar.
      */}
      <Signup />
    </AppLayout>
  );
}
