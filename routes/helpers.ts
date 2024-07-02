export function validateUserId(userId: any): {
  userId: number;
  isValid: boolean;
  message?: string;
} {
  const parsedUserId = Number(userId);
  if (!userId || isNaN(parsedUserId) || parsedUserId <= 0) {
    return {
      userId: parsedUserId,
      isValid: false,
      message: "Invalid or missing userId",
    };
  }
  return { userId: parsedUserId, isValid: true };
}
