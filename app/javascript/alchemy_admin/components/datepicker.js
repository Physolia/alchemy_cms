import { AlchemyHTMLElement } from "./alchemy_html_element"
import { translate, currentLocale } from "alchemy_admin/i18n"
import flatpickr from "flatpickr"

class Datepicker extends AlchemyHTMLElement {
  static properties = {
    type: { default: "date" }
  }

  afterRender() {
    const options = {
      // alchemy_i18n supports `zh_CN` etc., but flatpickr only has two-letter codes (`zh`)
      locale: currentLocale().slice(0, 2),
      altInput: true,
      altFormat: translate(`formats.${this.type}`),
      altInputClass: "flatpickr-input",
      dateFormat: "Z",
      enableTime: /time/.test(this.type),
      noCalendar: this.type === "time",
      time_24hr: translate("formats.time_24hr"),
      onValueUpdate(_selectedDates, _dateStr, instance) {
        Alchemy.setElementDirty(instance.element.closest(".element-editor"))
      }
    }

    flatpickr(this.getElementsByTagName("input")[0], options)
  }
}

customElements.define("alchemy-datepicker", Datepicker)
