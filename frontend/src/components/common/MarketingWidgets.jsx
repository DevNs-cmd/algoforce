import Chatbot from '../chatbot/Chatbot'
import ConsultancyButton from './ConsultancyButton'

// MarketingWidgets provides quiet, non-intrusive assistant tools (Chatbot & Consult button).
// Global popups for Summit & TallyGPT installs are removed to preserve conversion focus.
const MarketingWidgets = () => (
  <>
    <Chatbot />
    <ConsultancyButton />
  </>
)

export default MarketingWidgets
