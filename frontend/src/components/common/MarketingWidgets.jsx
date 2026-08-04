import Chatbot from '../chatbot/Chatbot'
import ConsultancyButton from './ConsultancyButton'
import WebinarPopup from './WebinarPopup'
import SummitGlobalPopup from './SummitGlobalPopup'

// These controls are helpful after a visitor starts exploring, but they do not
// belong on the critical rendering path of a marketing page.
const MarketingWidgets = () => (
  <>
    <Chatbot />
    <ConsultancyButton />
    <WebinarPopup />
    <SummitGlobalPopup />
  </>
)

export default MarketingWidgets
