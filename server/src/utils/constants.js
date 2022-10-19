const ROLE = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  MEMBER: "member",
};

const ORDER_STATUS = {
  NOT_PROCESSED: "not_processed",
  PROCESSING: "processing",
  SHIPPING: "shipping",
  COMPLETED: "completed",
  CANCELED: "canceled",
};

const BOOK_STATUS = {
  COMING_SOON: "coming_soon",
  AVAILABLE: "available",
  OUT_OF_STOCK: "out_of_stock",
};

module.exports = {
  ROLE,
  ORDER_STATUS,
  BOOK_STATUS,
};
