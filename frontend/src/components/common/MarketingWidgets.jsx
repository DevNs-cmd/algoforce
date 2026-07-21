import Chatbot from '../chatbot/Chatbot'
import ConsultancyButton from './ConsultancyButton'
import WebinarPopup from './WebinarPopup'

// These controls are helpful after a visitor starts exploring, but they do not
// belong on the critical rendering path of a marketing page.
const MarketingWidgets = () => (
  <>
    <Chatbot />
    <ConsultancyButton />
    <WebinarPopup />
  </>
)

export default MarketingWidgets
