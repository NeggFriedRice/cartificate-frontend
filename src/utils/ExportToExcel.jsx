import { saveAs } from 'file-saver'
import XLSX from 'xlsx'
import { motion } from 'framer-motion'

export default function ExportToExcel({ excelData }) {

  const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Buffer to store the generated Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      saveAs(blob, "maintenance.xlsx");
    };
  return (
    <button onClick={exportToExcel}>
      <motion.div
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.9, opacity: 0.5, transition: { delay: 0, duration: 0.1 }}}
      initial={{ x: -150, y: -100, opacity: 0}}
      animate={{ x: 0, y: 0, opacity: 1}}
      transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 150, damping: 15, ease: 'easeInOut' }}
      exit={{ y: 100, opacity: 0}}>
        <motion.img 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.75, duration: 0.5 } }}
        src="download.svg" className="h-[35px] max-lg:h-[22px] mx-2" />
      </motion.div>
    </button>
  )
}
