export function generateOrderCode() {
    const timestamp = Date.now().toString(36); // chuyển thời gian thành base36
    const random = Math.random().toString(36).substring(2, 8); // random 6 ký tự
    return `ORD-${timestamp}-${random}`.toUpperCase();
  }
  
  // Ví dụ: ORD-LN7C1W-8X2QZP
  