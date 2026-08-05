import { getPasswordStrength } from "../utils/passwordStrength";

const PasswordStrength = ({ password }) => {
  if (!password) return null;

  const strength = getPasswordStrength(password);

  return (
    <p className={`mt-2 text-sm font-semibold ${strength.color}`}>
      Password Strength: {strength.label}
    </p>
  );
};

export default PasswordStrength;