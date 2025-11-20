import { motion } from "framer-motion";
import { Filter } from "lucide-react";

const EmptyState = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <Filter className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
        Không tìm thấy dự án phù hợp
      </h3>
      <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
        Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác để khám phá thêm các dự án của chúng tôi
      </p>
    </motion.div>
  );
};

export default EmptyState;