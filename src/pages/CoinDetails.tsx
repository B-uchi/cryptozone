import { useParams } from "react-router-dom"
import {AnimatePresence, motion} from "framer-motion"


const CoinDetails = () => {
    const { id } = useParams<{id: string}>()
  return (
    <AnimatePresence
    >
      <motion.div
      key={id}
      initial={{x: 1000, opacity: 0}}
      animate={{x: 0, opacity: 1}}
      exit={{opacity: 0}}
      >
        <h1 className="text-white">{id}</h1>
      </motion.div>
    </AnimatePresence>
  )
}

export default CoinDetails