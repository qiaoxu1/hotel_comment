/**
 * Dashboard Bundle
 */


// Language Configuration for Internationalization
const LANGUAGE_CONFIG = {
  "en-US": {
    // Common texts used across components
    common: {
      loading: "Loading",
      error: "Unknown error",
      noData: "No data",
      to: "to",
      apply: "Apply",
      clear: "Clear",
    },
    // Filter related texts
    filter: {
      dateFilter: {
        title: "Date Range Filter",
        startPlaceholder: "Start date",
        endPlaceholder: "End date",
      },
      timeFilter: {
        title: "Time Range Filter",
        startPlaceholder: "Start time",
        endPlaceholder: "End time",
      },
      numberFilter: {
        title: "Number Range Filter",
        minPlaceholder: "Min",
        maxPlaceholder: "Max",
      },
      stringFilter: {
        title: "Text Filter",
        placeholder: "Enter keywords",
      },
    },
    // Error boundary texts
    error: {
      title: "Card Error",
      renderFailed: "Render failed",
      imageLoadFailed: "Image loading failed",
      invalidEChartsConfig: "Invalid ECharts configuration data",
      chartRenderError: "Error occurred during chart rendering",
      markedLibraryNotLoaded: "marked library not loaded",
      renderError: "Render error",
    },
    // Chart validation warnings
    warning: {
      legendPositionRequired: "legend must explicitly declare position (left/right/top/bottom)",
      legendScrollRecommended: "legend should enable type: 'scroll' to avoid taking up too much space",
      gridContainLabelDeprecated: "grid.containLabel is deprecated in ECharts v6.0.0, recommend using { left: 0, right: 0, top: 0, bottom: 0, containLabel: false } configuration",
      gridPositionMustBeNumber: "must be a number, strings or percentages are not allowed",
      gridOuterBoundsUnnecessary: "grid.outerBounds should only be used when legend or visualMap components are configured, otherwise remove this configuration",
      gridOuterBoundsMustBeNumber: "must be a number, strings or percentages are not allowed",
      gridOuterBoundsMultipleDirections: "has {count} directions set ({directions}). Usually only one direction is needed to reserve space for legend/visualMap components. Please verify if all settings are necessary.",
      gridOuterBoundsRequired: "grid.outerBounds must be configured to reserve space when legend or visualMap components are present",
      gridNonZeroPosition: "has non-zero position values ({positions}). Please carefully check if these configurations are necessary, as they may affect chart layout.",
      kpiDuplicateIcon: "KPI card has duplicate icon '{icon}' used {count} times at positions: {positions}. Consider using different icons for better visual distinction.",
    },
  },
  "zh-CN": {
    // Common texts used across components
    common: {
      loading: "加载中",
      error: "未知错误",
      noData: "暂无数据",
      to: "到",
      apply: "应用",
      clear: "清除",
    },
    // Filter related texts
    filter: {
      dateFilter: {
        title: "日期范围筛选",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
      },
      timeFilter: {
        title: "时间范围筛选",
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
      },
      numberFilter: {
        title: "数值范围筛选",
        minPlaceholder: "最小值",
        maxPlaceholder: "最大值",
      },
      stringFilter: {
        title: "文本筛选",
        placeholder: "输入关键词",
      },
    },
    // Error boundary texts
    error: {
      title: "卡片错误",
      renderFailed: "渲染失败",
      imageLoadFailed: "图片加载失败",
      invalidEChartsConfig: "无效的ECharts配置数据",
      chartRenderError: "图表渲染时发生错误",
      markedLibraryNotLoaded: "marked库未加载",
      renderError: "渲染错误",
    },
    // Chart validation warnings
    warning: {
      legendPositionRequired: "图例必须明确声明位置属性 (left/right/top/bottom)",
      legendScrollRecommended: "建议图例启用 type: 'scroll' 以避免占用过多空间",
      gridContainLabelDeprecated: "grid.containLabel 在 ECharts v6.0.0 中已弃用，建议使用 { left: 0, right: 0, top: 0, bottom: 0, containLabel: false } 配置",
      gridPositionMustBeNumber: "必须为数字，不允许使用字符串或百分比",
      gridOuterBoundsUnnecessary: "grid.outerBounds 仅在配置了图例或视觉映射组件时使用，否则请移除此配置",
      gridOuterBoundsMustBeNumber: "必须为数字，不允许使用字符串或百分比",
      gridOuterBoundsMultipleDirections: "设置了 {count} 个方向 ({directions})。通常只需要一个方向为图例/视觉映射组件预留空间。请确认是否所有设置都必要。",
      gridOuterBoundsRequired: "存在图例或视觉映射组件时，必须配置 grid.outerBounds 来预留空间",
      gridNonZeroPosition: "存在非零位置值 ({positions})。请仔细检查这些配置是否必要，因为它们可能会影响图表布局。",
      kpiDuplicateIcon: "KPI 卡片存在重复图标 '{icon}'，在第 {positions} 个位置使用了 {count} 次。建议使用不同的图标以获得更好的视觉区分度。",
    },
  },
};
// Language class for internationalization
class Language {
  constructor() {
    this.config = LANGUAGE_CONFIG;
    this.updateFromConfig();
  }
  // Set current language
  setLanguage(lang) {
    if (this.config[lang]) {
      this.currentLanguage = lang;
    } else {
      console.warn(`Language '${lang}' not found, using default 'zh-CN'`);
    }
  }
  // Get current language
  getLanguage() {
    return this.currentLanguage;
  }
  // Translation function (t) with interpolation support
  t(keyPath, fallback = "", params = {}) {
    const keys = keyPath.split(".");
    let current = this.config[this.currentLanguage];
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        console.warn(`Translation key not found: ${keyPath} for language: ${this.currentLanguage}`);
        current = fallback || keyPath;
        break;
      }
    }
    // Handle interpolation if params provided
    if (typeof current === "string" && params && typeof params === "object") {
      return current.replace(/\{(\w+)\}/g, (match, key) => {
        return params.hasOwnProperty(key) ? params[key] : match;
      });
    }
    return current;
  }
  // Add new language
  addLanguage(lang, translations) {
    this.config[lang] = translations;
  }
  // Get available languages
  getAvailableLanguages() {
    return Object.keys(this.config);
  }
  // Update language from magicDashboard configuration
  updateFromConfig() {
    let configLang = "zh-CN";
    if (window.magicDashboard && window.magicDashboard.language) {
      configLang = window.magicDashboard.language;
    }
    // Use the language directly if it exists in our config and is different from current
    if (this.config[configLang] && configLang !== this.currentLanguage) {
      this.setLanguage(configLang);
    }
  }
}
// Export to global scope
window.language = new Language();

// React error boundary component - Used to catch and handle JavaScript errors in child components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  getErrorThemeConfig() {
    const config = this.props.dashboardConfig;
    const fontSize = config.BASE_FONT_SIZE;
    return {
      FONT_SIZE: fontSize,
      MESSAGE_FONT_SIZE: fontSize,
      MESSAGE_MARGIN_BOTTOM: config.CARD_GAP,
      ERROR: config.COLORS_ERROR,
      TEXT_SECONDARY: config.COLORS_TEXT_SECONDARY,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    const errorEvent = new CustomEvent("ComponentError", {
      detail: {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: Date.now(),
        cardType: this.props.cardType || "unknown",
        cardId: this.props.cardId || "unknown",
      },
    });
    document.dispatchEvent(errorEvent);
  }
  // Get error message
  get errorMessage() {
    const { error } = this.state;
    if (typeof error === "string") return error;
    if (error?.message) return error.message;
    return language.t("error.renderFailed", "Render failed");
  }
  // Render error icon
  renderErrorIcon() {
    return React.createElement(
      "div",
      {
        key: "error-icon",
        style: {
          fontSize: "24px",
          marginBottom: "8px",
          opacity: 0.8,
        },
      },
      React.createElement("i", {
        className: "ti ti-alert-triangle",
        style: { fontSize: "24px", color: "#ff6b6b" },
      })
    );
  }
  // Render error message
  renderErrorMessage() {
    const themeConfig = this.getErrorThemeConfig();
    return React.createElement(
      "div",
      {
        key: "error-message",
        style: {
          color: themeConfig.ERROR,
          fontSize: themeConfig.MESSAGE_FONT_SIZE,
          fontWeight: "500",
          marginBottom: themeConfig.MESSAGE_MARGIN_BOTTOM,
          textAlign: "center",
        },
      },
      this.errorMessage
    );
  }
  // Render error card content
  renderErrorContent() {
    return React.createElement(
      "div",
      {
        key: "error-content",
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          textAlign: "center",
        },
      },
      [this.renderErrorIcon(), this.renderErrorMessage()]
    );
  }
  // Render error card
  renderErrorCard() {
    const { cardType = "unknown" } = this.props;
    const containerStyle = {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "12px",
      position: "relative",
    };
    return React.createElement(
      "div",
      {
        className: "error-card",
        style: containerStyle,
        "data-card-type": "error",
        title: `${cardType} card render error`,
      },
      this.renderErrorContent()
    );
  }
  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      const { fallback } = this.props;
      // If custom fallback component is provided
      if (fallback) {
        return React.createElement(fallback, {
          error: this.state.error,
          errorInfo: this.state.errorInfo,
          reset: () => this.setState({ hasError: false, error: null, errorInfo: null }),
        });
      }
      // Directly render error card
      return this.renderErrorCard();
    }
    return this.props.children;
  }
  // Provide method to reset error state
  reset() {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }
}
window.ErrorBoundary = ErrorBoundary;

/**
 * Card Modal Component - A modal dialog for enlarging cards
 * Provides a full-screen modal interface for displaying enlarged card content
 */
class CardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      title: "",
      content: null,
      shouldRenderContent: false
    };
    // Bind methods
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.calculateModalSize = this.calculateModalSize.bind(this);
  }
  componentDidMount() {
    // Add event listener for ESC key
    document.addEventListener("keydown", this.handleKeyDown);
    // Add event listener for window resize
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    // Remove event listeners
    document.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("resize", this.handleResize);
  }
  /**
   * Show modal with content
   * @param {string} title - The title to display in modal header
   * @param {React.ReactNode} content - The content to display in modal body
   */
  show(title, content) {
    this.setState({
      isVisible: true,
      title: title,
      content,
      shouldRenderContent: false
    });
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
    // Apply calculated size after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.updateModalSize();
      setTimeout(() => {
        this.setState({ shouldRenderContent: true });
      }, 300);
    }, 10);
  }
  /**
   * Hide modal
   */
  hide() {
    this.setState({
      isVisible: false,
      title: "",
      content: null,
      shouldRenderContent: false
    });
    // Remove body overflow style to restore original scrolling behavior
    document.body.style.removeProperty("overflow");
  }
  /**
   * Handle close button click
   */
  handleClose() {
    this.hide();
    // Call onClose callback if provided
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  /**
   * Handle ESC key press
   */
  handleKeyDown(event) {
    if (event.key === "Escape" && this.state.isVisible) {
      this.handleClose();
    }
  }
  /**
   * Handle backdrop click (click outside modal content)
   */
  handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      this.handleClose();
    }
  }
  /**
   * Handle window resize
   */
  handleResize() {
    if (this.state.isVisible) {
      this.updateModalSize();
    }
  }
  /**
   * Calculate modal size based on screen dimensions
   * @returns {Object} Object containing width and height
   */
  calculateModalSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    // Define aspect ratio (width:height = 4:3 for better content display)
    const aspectRatio = 4 / 3;
    // Calculate width based on screen size with responsive breakpoints
    let modalWidth;
    if (screenWidth <= 480) {
      // Mobile: 95% of screen width
      modalWidth = screenWidth * 0.95;
    } else if (screenWidth <= 768) {
      // Tablet: 85% of screen width
      modalWidth = screenWidth * 0.85;
    } else if (screenWidth <= 1200) {
      // Desktop small: 75% of screen width
      modalWidth = screenWidth * 0.75;
    } else {
      // Desktop large: max 1000px or 70% of screen width
      modalWidth = Math.min(screenWidth * 0.7, 1000);
    }
    // Calculate height based on aspect ratio
    let modalHeight = modalWidth / aspectRatio;
    // Ensure height doesn't exceed 90% of screen height
    const maxHeight = screenHeight * 0.9;
    if (modalHeight > maxHeight) {
      modalHeight = maxHeight;
      modalWidth = modalHeight * aspectRatio;
    }
    // Ensure minimum dimensions for usability
    modalWidth = Math.max(modalWidth, 320);
    modalHeight = Math.max(modalHeight, 240);
    return {
      width: Math.round(modalWidth),
      height: Math.round(modalHeight)
    };
  }
  /**
   * Update modal size by applying calculated dimensions
   */
  updateModalSize() {
    const modalContainer = document.querySelector('.card-modal-container');
    if (modalContainer) {
      const { width, height } = this.calculateModalSize();
      modalContainer.style.width = `${width}px`;
      modalContainer.style.height = `${height}px`;
    }
  }
  /**
   * Render modal content
   */
  renderModalContent() {
    const { title, content, shouldRenderContent } = this.state;
    if (!content) return null;
    return [
      React.createElement(
        "div",
        { 
          key: "modal-header",
          className: "modal-header" 
        },
        React.createElement(
          "div",
          { className: "modal-title" },
          title
        ),
        React.createElement(
          "div",
          {
            className: "modal-close-btn",
            onClick: this.handleClose,
            "aria-label": "Close modal"
          },
          React.createElement("i", { className: "ti ti-x" })
        )
      ),
      React.createElement(
        "div",
        { 
          key: "modal-body",
          className: "modal-body"
        },
        shouldRenderContent ? content : null
      )
    ];
  }
  render() {
    const { isVisible } = this.state;
    if (!isVisible) return null;
    return React.createElement(
      "div",
      {
        className: "card-modal-overlay",
        onClick: this.handleBackdropClick
      },
      React.createElement(
        "div",
        { className: "card-modal-container" },
        this.renderModalContent()
      )
    );
  }
  /**
   * Static method to open modal using Portal
   * @param {string} title - Modal title
   * @param {React.ReactNode} content - Modal content
   * @param {Object} options - Additional options
   * @returns {Function} Close function to manually close the modal
   */
  static open(title, content, options = {}) {
    // Create container element
    const container = document.createElement('div');
    container.className = 'card-modal-portal-container';
    document.body.appendChild(container);
    // Create a wrapper component that auto-shows the modal
    class PortalModalWrapper extends React.Component {
      constructor(props) {
        super(props);
        this.modalRef = React.createRef();
      }
      componentDidMount() {
        // Auto-show modal after mount
        if (this.modalRef.current) {
          this.modalRef.current.show(title, content);
        }
      }
      handleClose = () => {
        // Clean up when modal closes
        CardModal.cleanup(container);
        if (options.onClose) {
          options.onClose();
        }
      }
      render() {
        return React.createElement(CardModal, {
          ref: this.modalRef,
          onClose: this.handleClose
        });
      }
    }
    // Render wrapper to container
    ReactDOM.render(React.createElement(PortalModalWrapper), container);
    // Return close function
    return () => {
      CardModal.cleanup(container);
    };
  }
  /**
   * Cleanup modal container
   * @param {HTMLElement} container - Container element to cleanup
   */
  static cleanup(container) {
    if (container && container.parentNode) {
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
    }
  }
}
window.CardModal = CardModal;

// String Filter Component - String filtering component
class StringFilter extends React.Component {
  render() {
    const { value, onChange, placeholder } = this.props;
    return React.createElement(
      "div",
      { style: { padding: "8px" } },
      React.createElement("div", { style: { marginBottom: "8px", fontSize: this.props.dashboardConfig.BASE_FONT_SIZE, color: this.props.dashboardConfig.COLORS_TEXT_PRIMARY, fontWeight: "500" } }, language.t("filter.stringFilter.title")),
      React.createElement("input", {
        type: "text",
        placeholder: placeholder || language.t("filter.stringFilter.placeholder"),
        value: value,
        onChange: e => onChange(e.target.value),
        style: {
          width: "100%",
          padding: "4px 8px",
          border: `1px solid ${this.props.dashboardConfig.COLORS_BORDER}`,
          borderRadius: "4px",
          fontSize: this.props.dashboardConfig.BASE_FONT_SIZE,
          height: `calc(${this.props.dashboardConfig.TABLE_CELL_HEIGHT} - 2px)`,
          boxSizing: "border-box",
        },
      })
    );
  }
}
window.StringFilter = StringFilter;

// Number Filter Component - Number range filtering component
class NumberFilter extends React.Component {
  constructor(props) {
    super(props);
    // Parse existing value, supports range format "min-max" or single number
    const parseValue = val => {
      if (!val) return { min: "", max: "" };
      if (typeof val === "string" && val.includes("-")) {
        const [min, max] = val.split("-");
        return { min: min || "", max: max || "" };
      }
      return { min: val || "", max: "" };
    };
    this.state = parseValue(props.value);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      const parseValue = val => {
        if (!val) return { min: "", max: "" };
        if (typeof val === "string" && val.includes("-")) {
          const [min, max] = val.split("-");
          return { min: min || "", max: max || "" };
        }
        return { min: val || "", max: "" };
      };
      this.setState(parseValue(this.props.value));
    }
  }
  handleChange = (type, value) => {
    const newState = { ...this.state, [type]: value };
    this.setState(newState);
    // Build filter value
    const { min, max } = newState;
    let filterValue = "";
    if (min && max) {
      filterValue = `${min}-${max}`;
    } else if (min) {
      filterValue = min;
    } else if (max) {
      filterValue = `-${max}`;
    }
    this.props.onChange(filterValue);
  };
  render() {
    const { placeholder } = this.props;
    const { min, max } = this.state;
    return React.createElement(
      "div",
      { style: { padding: "8px" } },
      React.createElement("div", { style: { marginBottom: "8px", fontSize: this.props.dashboardConfig.BASE_FONT_SIZE, color: this.props.dashboardConfig.COLORS_TEXT_PRIMARY, fontWeight: "500" } }, language.t("filter.numberFilter.title")),
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "8px" } },
        React.createElement("input", {
          type: "number",
          placeholder: language.t("filter.numberFilter.minPlaceholder"),
          value: min,
          onChange: e => this.handleChange("min", e.target.value),
          style: {
            flex: 1,
            padding: "4px 8px",
            border: `1px solid ${this.props.dashboardConfig.COLORS_BORDER}`,
            borderRadius: "4px",
            fontSize: this.props.dashboardConfig.BASE_FONT_SIZE,
            height: `calc(${this.props.dashboardConfig.TABLE_CELL_HEIGHT} - 2px)`,
            boxSizing: "border-box",
          },
        }),
        React.createElement("span", { style: { color: this.props.dashboardConfig.COLORS_TEXT_SECONDARY, fontSize: this.props.dashboardConfig.BASE_FONT_SIZE } }, language.t("common.to")),
        React.createElement("input", {
          type: "number",
          placeholder: language.t("filter.numberFilter.maxPlaceholder"),
          value: max,
          onChange: e => this.handleChange("max", e.target.value),
          style: {
            flex: 1,
            padding: "4px 8px",
            border: `1px solid ${this.props.dashboardConfig.COLORS_BORDER}`,
            borderRadius: "4px",
            fontSize: this.props.dashboardConfig.BASE_FONT_SIZE,
            height: `calc(${this.props.dashboardConfig.TABLE_CELL_HEIGHT} - 2px)`,
            boxSizing: "border-box",
          },
        })
      )
    );
  }
}
window.NumberFilter = NumberFilter;

// Date Filter Component - Date range filtering component
class DateFilter extends React.Component {
  constructor(props) {
    super(props);
    // Parse existing value, supports timestamp format "startTimestamp,endTimestamp" or traditional date format
    const parseValue = val => {
      if (!val) return { startDate: "", endDate: "" };
      // Check if it's timestamp format
      if (typeof val === "string" && val.includes(",")) {
        const [startTs, endTs] = val.split(",");
        let startDate = "";
        let endDate = "";
        if (startTs) {
          const startTimestamp = parseInt(startTs);
          if (!isNaN(startTimestamp)) {
            startDate = new Date(startTimestamp).toISOString().split("T")[0];
          }
        }
        if (endTs) {
          const endTimestamp = parseInt(endTs);
          if (!isNaN(endTimestamp)) {
            endDate = new Date(endTimestamp).toISOString().split("T")[0];
          }
        }
        return { startDate, endDate };
      }
      // Compatible with traditional format "startDate~endDate"
      if (typeof val === "string" && val.includes("~")) {
        const [start, end] = val.split("~");
        return { startDate: start || "", endDate: end || "" };
      }
      // Single date value
      return { startDate: val || "", endDate: "" };
    };
    this.state = parseValue(props.value);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      const parseValue = val => {
        if (!val) return { startDate: "", endDate: "" };
        // Check if it's timestamp format
        if (typeof val === "string" && val.includes(",")) {
          const [startTs, endTs] = val.split(",");
          let startDate = "";
          let endDate = "";
          if (startTs) {
            const startTimestamp = parseInt(startTs);
            if (!isNaN(startTimestamp)) {
              startDate = new Date(startTimestamp).toISOString().split("T")[0];
            }
          }
          if (endTs) {
            const endTimestamp = parseInt(endTs);
            if (!isNaN(endTimestamp)) {
              endDate = new Date(endTimestamp).toISOString().split("T")[0];
            }
          }
          return { startDate, endDate };
        }
        // Compatible with traditional format "startDate~endDate"
        if (typeof val === "string" && val.includes("~")) {
          const [start, end] = val.split("~");
          return { startDate: start || "", endDate: end || "" };
        }
        // Single date value
        return { startDate: val || "", endDate: "" };
      };
      this.setState(parseValue(this.props.value));
    }
  }
  handleChange = (type, value) => {
    const newState = { ...this.state, [type]: value };
    this.setState(newState);
    // Build filter value - use timestamp as internal format
    const { startDate, endDate } = newState;
    let filterValue = "";
    if (startDate && endDate) {
      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate + "T23:59:59").getTime(); // End date includes whole day
      filterValue = `${startTimestamp},${endTimestamp}`;
    } else if (startDate) {
      const startTimestamp = new Date(startDate).getTime();
      filterValue = `${startTimestamp},`; // Only start date, no end limit
    } else if (endDate) {
      const endTimestamp = new Date(endDate + "T23:59:59").getTime();
      filterValue = `,${endTimestamp}`; // Only end date, no start limit
    }
    this.props.onChange(filterValue);
  };
  // Validate and format date value - strict YYYY-MM-DD parsing
  formatDateValue(dateValue) {
    if (!dateValue) return "";
    // Strict validation: only accept YYYY-MM-DD format
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = dateValue.match(dateRegex);
    if (!match) {
      return ""; // Invalid format returns empty string
    }
    const [, year, month, day] = match;
    // Validate date ranges
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    if (yearNum < 1900 || yearNum > 2100) return "";
    if (monthNum < 1 || monthNum > 12) return "";
    if (dayNum < 1 || dayNum > 31) return "";
    // Additional validation using Date object
    const date = new Date(yearNum, monthNum - 1, dayNum);
    if (date.getFullYear() !== yearNum || date.getMonth() !== monthNum - 1 || date.getDate() !== dayNum) {
      return ""; // Invalid date (e.g., Feb 30th)
    }
    return dateValue; // Return original YYYY-MM-DD format
  }
  render() {
    const { startDate, endDate } = this.state;
    return React.createElement(
      "div",
      { style: { padding: "8px" } },
      React.createElement("div", { style: { marginBottom: "8px", fontSize: this.props.dashboardConfig.BASE_FONT_SIZE, color: this.props.dashboardConfig.COLORS_TEXT_PRIMARY, fontWeight: "500" } }, language.t("filter.dateFilter.title")),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "8px" } },
        React.createElement("input", {
          type: "date",
          placeholder: language.t("filter.dateFilter.startPlaceholder"),
          value: this.formatDateValue(startDate),
          onChange: e => this.handleChange("startDate", e.target.value),
          style: {
            width: "100%",
            padding: "4px 8px",
            border: `1px solid ${this.props.dashboardConfig.COLORS_BORDER}`,
            borderRadius: "4px",
            fontSize: this.props.dashboardConfig.BASE_FONT_SIZE,
            height: `calc(${this.props.dashboardConfig.TABLE_CELL_HEIGHT} - 2px)`,
            boxSizing: "border-box",
          },
        }),
        React.createElement("div", { style: { textAlign: "center", color: this.props.dashboardConfig.COLORS_TEXT_SECONDARY, fontSize: this.props.dashboardConfig.BASE_FONT_SIZE } }, language.t("common.to")),
        React.createElement("input", {
          type: "date",
          placeholder: language.t("filter.dateFilter.endPlaceholder"),
          value: this.formatDateValue(endDate),
          onChange: e => this.handleChange("endDate", e.target.value),
          style: {
            width: "100%",
            padding: "4px 8px",
            border: `1px solid ${this.props.dashboardConfig.COLORS_BORDER}`,
            borderRadius: "4px",
            fontSize: this.props.dashboardConfig.BASE_FONT_SIZE,
            height: `calc(${this.props.dashboardConfig.TABLE_CELL_HEIGHT} - 2px)`,
            boxSizing: "border-box",
          },
        })
      )
    );
  }
}
window.DateFilter = DateFilter;

// Time Filter Component - Time range filtering component
class TimeFilter extends React.Component {
  constructor(props) {
    super(props);
    // Parse existing value, supports timestamp format "startTimestamp,endTimestamp" or traditional time format
    const parseValue = val => {
      if (!val) return { startTime: "", endTime: "" };
      // Check if it's timestamp format
      if (typeof val === "string" && val.includes(",")) {
        const [startTs, endTs] = val.split(",");
        let startTime = "";
        let endTime = "";
        if (startTs) {
          const startTimestamp = parseInt(startTs);
          if (!isNaN(startTimestamp)) {
            startTime = new Date(startTimestamp).toTimeString().substr(0, 5);
          }
        }
        if (endTs) {
          const endTimestamp = parseInt(endTs);
          if (!isNaN(endTimestamp)) {
            endTime = new Date(endTimestamp).toTimeString().substr(0, 5);
          }
        }
        return { startTime, endTime };
      }
      // Compatible with traditional format "startTime~endTime"
      if (typeof val === "string" && val.includes("~")) {
        const [start, end] = val.split("~");
        return { startTime: start || "", endTime: end || "" };
      }
      // Single time value
      return { startTime: val || "", endTime: "" };
    };
    this.state = parseValue(props.value);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      const parseValue = val => {
        if (!val) return { startTime: "", endTime: "" };
        // Check if it's timestamp format
        if (typeof val === "string" && val.includes(",")) {
          const [startTs, endTs] = val.split(",");
          let startTime = "";
          let endTime = "";
          if (startTs) {
            const startTimestamp = parseInt(startTs);
            if (!isNaN(startTimestamp)) {
              startTime = new Date(startTimestamp).toTimeString().substr(0, 5);
            }
          }
          if (endTs) {
            const endTimestamp = parseInt(endTs);
            if (!isNaN(endTimestamp)) {
              endTime = new Date(endTimestamp).toTimeString().substr(0, 5);
            }
          }
          return { startTime, endTime };
        }
        // Compatible with traditional format "startTime~endTime"
        if (typeof val === "string" && val.includes("~")) {
          const [start, end] = val.split("~");
          return { startTime: start || "", endTime: end || "" };
        }
        // Single time value
        return { startTime: val || "", endTime: "" };
      };
      this.setState(parseValue(this.props.value));
    }
  }
  handleChange = (type, value) => {
    const newState = { ...this.state, [type]: value };
    this.setState(newState);
    // Build filter value - use timestamp as internal format
    const { startTime, endTime } = newState;
    let filterValue = "";
    // Convert time to today's timestamp for comparison
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    if (startTime && endTime) {
      const startTimestamp = new Date(`${today}T${startTime}:00`).getTime();
      const endTimestamp = new Date(`${today}T${endTime}:59`).getTime(); // Include whole minute
      filterValue = `${startTimestamp},${endTimestamp}`;
    } else if (startTime) {
      const startTimestamp = new Date(`${today}T${startTime}:00`).getTime();
      filterValue = `${startTimestamp},`; // Only start time, no end limit
    } else if (endTime) {
      const endTimestamp = new Date(`${today}T${endTime}:59`).getTime();
      filterValue = `,${endTimestamp}`; // Only end time, no start limit
    }
    this.props.onChange(filterValue);
  };
  // Validate and format time value - strict HH:mm parsing
  formatTimeValue(timeValue) {
    if (!timeValue) return "";
    // Strict validation: only accept HH:mm format
    const timeRegex = /^(\d{2}):(\d{2})$/;
    const match = timeValue.match(timeRegex);
    if (!match) {
      return ""; // Invalid format returns empty string
    }
    const [, hours, minutes] = match;
    // Validate time ranges
    const hoursNum = parseInt(hours);
    const minutesNum = parseInt(minutes);
    if (hoursNum < 0 || hoursNum > 23) return "";
    if (minutesNum < 0 || minutesNum > 59) return "";
    return timeValue; // Return original HH:mm format
  }
  render() {
    const { startTime, endTime } = this.state;
    return React.createElement(
      "div",
      { style: { padding: "8px" } },
      React.createElement("div", { style: { marginBottom: "8px", fontSize: this.props.dashboardConfig.BASE_FONT_SIZE, color: this.props.dashboardConfig.COLORS_TEXT_PRIMARY, fontWeight: "500" } }, language.t("filter.timeFilter.title")),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "8px" } },
        React.createElement("input", {
          type: "time",
          placeholder: language.t("filter.timeFilter.startPlaceholder"),
          value: this.formatTimeValue(startTime),
          onChange: e => this.handleChange("startTime", e.target.value),
          style: {
            width: "100%",
            padding: "4px 8px",
            border: `1px solid ${this.props.dashboardConfig.COLORS_BORDER}`,
            borderRadius: "4px",
            fontSize: this.props.dashboardConfig.BASE_FONT_SIZE,
            height: `calc(${this.props.dashboardConfig.TABLE_CELL_HEIGHT} - 2px)`,
            boxSizing: "border-box",
          },
        }),
        React.createElement("div", { style: { textAlign: "center", color: this.props.dashboardConfig.COLORS_TEXT_SECONDARY, fontSize: this.props.dashboardConfig.BASE_FONT_SIZE } }, language.t("common.to")),
        React.createElement("input", {
          type: "time",
          placeholder: language.t("filter.timeFilter.endPlaceholder"),
          value: this.formatTimeValue(endTime),
          onChange: e => this.handleChange("endTime", e.target.value),
          style: {
            width: "100%",
            padding: "4px 8px",
            border: `1px solid ${this.props.dashboardConfig.COLORS_BORDER}`,
            borderRadius: "4px",
            fontSize: this.props.dashboardConfig.BASE_FONT_SIZE,
            height: `calc(${this.props.dashboardConfig.TABLE_CELL_HEIGHT} - 2px)`,
            boxSizing: "border-box",
          },
        })
      )
    );
  }
}
window.TimeFilter = TimeFilter;

// Filter Popup Component - Filter popup component
class FilterPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempValue: props.value || "",
    };
    this.popupRef = React.createRef();
    this.isClosing = false; // Flag to indicate if closing
  }
  componentDidMount() {
    // Detect if we're inside a modal by checking for modal container in DOM hierarchy
    const isInsideModal = this.isInsideModal();
    const baseZIndex = isInsideModal ? 10000 : 999; // Use higher z-index when inside modal
    // Create overlay and add to body
    this.overlay = document.createElement("div");
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: ${baseZIndex};
      background-color: rgba(0, 0, 0, 0);
      transition: background-color 0.2s ease;
    `;
    this.overlay.addEventListener("click", this.closeWithAnimation);
    document.body.appendChild(this.overlay);
    // Create popup container and add to body
    this.popupContainer = document.createElement("div");
    this.popupContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      z-index: ${baseZIndex + 1};
      pointer-events: none;
    `;
    document.body.appendChild(this.popupContainer);
    // Initial render of popup content
    this.renderPopupToBody();
  }
  componentDidUpdate(prevProps) {
    // If closing, don't re-render
    if (this.isClosing) return;
    // Only re-render and recalculate position when position-related props change
    if (prevProps.position !== this.props.position || prevProps.buttonRect !== this.props.buttonRect || prevProps.column !== this.props.column) {
      this.renderPopupToBody();
    } else {
      // If only content changes (like value), only update content, don't recalculate position
      this.updatePopupContent();
    }
  }
  componentWillUnmount() {
    // Clean up overlay and popup container
    if (this.overlay) {
      this.overlay.removeEventListener("click", this.closeWithAnimation);
      document.body.removeChild(this.overlay);
    }
    if (this.popupContainer) {
      document.body.removeChild(this.popupContainer);
    }
  }
  // Check if FilterPopup is rendered inside a modal
  isInsideModal() {
    // Check if there's a modal overlay in the DOM (indicating a modal is open)
    const modalOverlay = document.querySelector('.card-modal-overlay');
    return modalOverlay !== null;
  }
  updatePopupContent() {
    if (!this.popupContainer || !this.popupRef.current) return;
    // Only update popup content, maintain current position and styles
    const popupElement = this.popupRef.current;
    const currentStyles = {
      position: popupElement.style.position,
      top: popupElement.style.top,
      left: popupElement.style.left,
      opacity: popupElement.style.opacity,
      transform: popupElement.style.transform,
      transition: popupElement.style.transition,
    };
    const popupContent = React.createElement(
      "div",
      {
        ref: this.popupRef,
        style: {
          position: currentStyles.position || "fixed",
          top: currentStyles.top,
          left: currentStyles.left,
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "6px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          minWidth: "200px",
          pointerEvents: "auto",
          opacity: currentStyles.opacity || "1",
          transform: currentStyles.transform || "scale(1)",
          transition: currentStyles.transition || "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
      this.renderFilterContent(),
      React.createElement(
        "div",
        {
          style: {
            padding: "8px",
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            gap: "8px",
          },
        },
        React.createElement(
          "button",
          {
            onClick: this.handleClear,
            className: "filter-popup-button filter-popup-button-clear",
          },
          language.t("common.clear")
        ),
        React.createElement(
          "button",
          {
            onClick: this.handleApply,
            className: "filter-popup-button filter-popup-button-apply",
          },
          language.t("common.apply")
        )
      )
    );
    ReactDOM.render(popupContent, this.popupContainer);
  }
  renderPopupToBody() {
    if (!this.popupContainer) return;
    const { position } = this.props;
    // Use ReactDOM.render to render popup content to body container
    const popupContent = React.createElement(
      "div",
      {
        ref: this.popupRef,
        style: {
          position: "fixed",
          top: position.top + "px",
          left: position.left + "px",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "6px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          minWidth: "200px",
          pointerEvents: "auto",
          opacity: 0, // Initially transparent
          transform: "scale(0.95)", // Initial scale, no position offset
          transition: "none", // No transition effect initially
        },
      },
      this.renderFilterContent(),
      React.createElement(
        "div",
        {
          style: {
            padding: "8px",
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            gap: "8px",
          },
        },
        React.createElement(
          "button",
          {
            onClick: this.handleClear,
            className: "filter-popup-button filter-popup-button-clear",
          },
          language.t("common.clear")
        ),
        React.createElement(
          "button",
          {
            onClick: this.handleApply,
            className: "filter-popup-button filter-popup-button-apply",
          },
          language.t("common.apply")
        )
      )
    );
    ReactDOM.render(popupContent, this.popupContainer);
    // Use setTimeout to ensure DOM rendering is complete before getting dimensions
    setTimeout(() => {
      this.adjustPopupPosition();
    }, 0);
  }
  adjustPopupPosition() {
    if (!this.popupRef.current) return;
    const popupElement = this.popupRef.current;
    const { position, buttonRect, dashboardConfig } = this.props;
    // Get actual popup dimensions
    const popupRect = popupElement.getBoundingClientRect();
    const popupWidth = popupRect.width;
    const popupHeight = popupRect.height;
    // Get container padding configuration
    const containerPadding = dashboardConfig.GRID_CONTAINER_PADDING[0];
    // Viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    // Recalculate position
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    let finalLeft = buttonCenterX - popupWidth / 2;
    let finalTop = buttonRect.bottom + 12;
    // Horizontal position adjustment
    finalLeft = Math.max(containerPadding, Math.min(finalLeft, viewportWidth - popupWidth - containerPadding));
    // Vertical position adjustment - if not enough space below, show above button
    if (finalTop + popupHeight > viewportHeight - containerPadding) {
      finalTop = buttonRect.top - popupHeight - 12;
      // If not enough space above either, force display below but adjust within bounds
      if (finalTop < containerPadding) {
        finalTop = Math.max(containerPadding, viewportHeight - popupHeight - containerPadding);
      }
    }
    // Apply final position
    popupElement.style.left = finalLeft + "px";
    popupElement.style.top = finalTop + "px";
    // Use requestAnimationFrame to ensure position is set before enabling transition and triggering animation
    requestAnimationFrame(() => {
      // Enable transition effect
      popupElement.style.transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
      // Trigger show animation
      popupElement.style.opacity = "1";
      popupElement.style.transform = "scale(1)"; // Only keep scale, no position offset
      // Also trigger overlay fade-in effect (optional light background)
      if (this.overlay) {
        this.overlay.style.backgroundColor = "rgba(0, 0, 0, 0.02)";
      }
    });
  }
  handleApply = () => {
    this.props.onChange(this.state.tempValue);
    this.closeWithAnimation();
  };
  handleClear = () => {
    this.setState({ tempValue: "" });
    this.props.onChange("");
    this.closeWithAnimation();
  };
  closeWithAnimation = () => {
    // Set closing flag to prevent re-rendering during close process
    this.isClosing = true;
    if (!this.popupRef.current) {
      this.props.onClose();
      return;
    }
    const popupElement = this.popupRef.current;
    // Trigger close animation
    popupElement.style.opacity = "0";
    popupElement.style.transform = "scale(0.95)"; // Only keep scale, no position offset
    // Also trigger overlay fade out
    if (this.overlay) {
      this.overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
    // Close popup after animation completes
    setTimeout(() => {
      this.props.onClose();
    }, 200); // Consistent with transition time
  };
  renderFilterContent() {
    const { column } = this.props;
    const { tempValue } = this.state;
    const handleChange = value => {
      this.setState({ tempValue: value });
    };
    switch (column.dataType) {
      case "number":
        return React.createElement(NumberFilter, {
          value: tempValue,
          onChange: handleChange,
          placeholder: `${language.t("filter.numberFilter.title")} ${column.title}`,
          dashboardConfig: this.props.dashboardConfig,
        });
      case "date":
        return React.createElement(DateFilter, {
          value: tempValue,
          onChange: handleChange,
          dashboardConfig: this.props.dashboardConfig,
        });
      case "time":
        return React.createElement(TimeFilter, {
          value: tempValue,
          onChange: handleChange,
          dashboardConfig: this.props.dashboardConfig,
        });
      case "string":
      default:
        return React.createElement(StringFilter, {
          value: tempValue,
          onChange: handleChange,
          placeholder: `${language.t("filter.stringFilter.placeholder")} ${column.title}`,
          dashboardConfig: this.props.dashboardConfig,
        });
    }
  }
  render() {
    // Popup content is rendered to body via DOM manipulation, return null here
    return null;
  }
}
window.FilterPopup = FilterPopup;

// Metric card - Suitable for displaying single key business metrics and change trends
class MetricCard extends React.Component {
  constructor(props) {
    super(props);
  }
  getMetricThemeConfig() {
    const config = this.props.dashboardConfig;
    const baseFontSize = parseFloat(config.BASE_FONT_SIZE);
    const numberCardGap = parseFloat(config.CARD_GAP);
    return {
      BASE_NUMBER_FONT_SIZE: baseFontSize,
      NUMBER_CARD_GAP: numberCardGap,
      ICON_TYPE: config.METRIC_CARD_ICON_TYPE || "circle",
      FONT_SIZE: `${baseFontSize}px`,
      ICON_FONT_SIZE: `${baseFontSize * 1.5}px`,
      VALUE_FONT_SIZE: `${baseFontSize * 2}px`,
      UNIT_FONT_SIZE: `${baseFontSize * 1}px`,
      CHANGE_FONT_SIZE: `${baseFontSize * 1}px`,
      ELEMENT_GAP: `${numberCardGap * 0.25}px`,
      TEXT_PRIMARY: config.COLORS_TEXT_PRIMARY,
      TEXT_SECONDARY: config.COLORS_TEXT_SECONDARY,
      PRIMARY: config.COLORS_PRIMARY,
      SUCCESS: config.COLORS_SUCCESS,
      ERROR: config.COLORS_ERROR,
      WARNING: config.COLORS_WARNING,
    };
  }
  static async preprocessData(data) {
    return data;
  }
  parseUnifiedData(data) {
    if (data && data.label && data.value !== undefined) {
      return data;
    }
    return {
      label: null,
      value: 0,
      change: "",
      unit: "",
      icon: "",
    };
  }
  getChangeType(change) {
    if (!change) return "neutral";
    if (typeof change === "string") {
      return change.startsWith("+") ? "positive" : change.startsWith("-") ? "negative" : "neutral";
    }
    if (typeof change === "number") {
      return change > 0 ? "positive" : change < 0 ? "negative" : "neutral";
    }
    return "neutral";
  }
  // Render icon - Support tabler-icons and emoji
  renderIcon(icon, iconColor, themeConfig) {
    if (!icon) return null;
    const isCircleMode = themeConfig.ICON_TYPE === "circle";
    if (isCircleMode) {
      return this.renderCircleIcon(icon, iconColor, themeConfig);
    } else {
      return this.renderNormalIcon(icon, iconColor, themeConfig);
    }
  }
  // Render circle mode icon with background and shadow
  renderCircleIcon(icon, iconColor, themeConfig) {
    const iconSize = `${themeConfig.BASE_NUMBER_FONT_SIZE * 1.75}px`;
    const numberIconSize = parseFloat(iconSize);
    const circleSize = numberIconSize * 2;
    const containerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${circleSize}px`,
      height: `${circleSize}px`,
      borderRadius: "50%",
      background: window.UTILS.getCircleGradientBackground(iconColor, themeConfig.PRIMARY),
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    };
    return React.createElement(
      "div",
      { style: containerStyle },
      this.createIconElement(icon, iconSize, "white")
    );
  }
  // Render normal mode icon without background
  renderNormalIcon(icon, iconColor, themeConfig) {
    const iconSize = themeConfig.ICON_FONT_SIZE;
    const numberIconSize = parseFloat(iconSize);
    const iconColorStyle = iconColor || themeConfig.TEXT_PRIMARY;
    const containerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${numberIconSize}px`,
      height: `${numberIconSize}px`,
    };
    return React.createElement(
      "div",
      { style: containerStyle },
      this.createIconElement(icon, iconSize, iconColorStyle)
    );
  }
  // Create icon element (tabler-icons or emoji/text)
  createIconElement(icon, iconSize, iconColor) {
    const isTablerIcon = typeof icon === "string" && icon.startsWith("ti-");
    if (isTablerIcon) {
      return React.createElement("i", {
        className: `ti ${icon}`,
        style: {
          fontSize: iconSize,
          color: iconColor,
        },
      });
    }
    // Render emoji or other characters
    return React.createElement(
      "div",
      {
        style: {
          fontSize: iconSize,
          color: iconColor,
        },
      },
      icon
    );
  }
  // Render empty state when no data is provided
  renderEmptyState(themeConfig) {
    return React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: themeConfig.TEXT_SECONDARY,
          fontSize: themeConfig.FONT_SIZE,
        },
      },
      null
    );
  }
  // Build array of elements to render
  buildRenderElements(parsedData, themeConfig) {
    const { icon, iconColor } = parsedData;
    const elements = [];
    const isCircleMode = themeConfig.ICON_TYPE === "circle";
    // Add icon container if icon exists
    if (icon) {
      elements.push({
        key: "metric-icon-container",
        element: this.renderIconContainer(icon, iconColor, themeConfig),
      });
    }
    // Add spacer div for circle mode
    if (isCircleMode && icon) {
      elements.push({
        key: "metric-spacer",
        element: this.renderSpacer(themeConfig),
      });
    }
    // Add content container
    elements.push({
      key: "metric-content-container",
      element: this.renderContentContainer(parsedData, themeConfig),
    });
    return elements.filter(Boolean);
  }
  // Render icon container
  renderIconContainer(icon, iconColor, themeConfig) {
    return React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      this.renderIcon(icon, iconColor, themeConfig)
    );
  }
  // Render spacer div for circle mode
  renderSpacer(themeConfig) {
    return React.createElement("div", {
      className: "metric-spacer",
      style: {
        width: "20%",
        maxWidth: themeConfig.NUMBER_CARD_GAP * 2,
        minWidth: themeConfig.NUMBER_CARD_GAP / 2,
      },
    });
  }
  // Render content container with value, label, and change
  renderContentContainer(parsedData, themeConfig) {
    const { change, value, unit, label } = parsedData;
    const isCircleMode = themeConfig.ICON_TYPE === "circle";
    return React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: isCircleMode ? "flex-start" : "center",
          gap: themeConfig.ELEMENT_GAP,
          maxWidth: "100%",
          overflow: isCircleMode ? "hidden" : undefined,
        },
      },
      [
        this.renderValueLabelContainer(value, unit, label, themeConfig),
        change && this.renderChangeIndicator(change, themeConfig),
      ].filter(Boolean)
    );
  }
  // Render value and label container
  renderValueLabelContainer(value, unit, label, themeConfig) {
    const isCircleMode = themeConfig.ICON_TYPE === "circle";
    const isNormalMode = themeConfig.ICON_TYPE === "normal";
    return React.createElement(
      "div",
      {
        key: "metric-value-label-container",
        style: {
          display: "flex",
          flexDirection: isNormalMode ? "column" : "column-reverse",
          alignItems: "center",
          gap: themeConfig.ELEMENT_GAP,
          width: "100%",
          textAlign: isCircleMode ? "left" : "center",
        },
      },
      [
        this.renderValueWithUnit(value, unit, themeConfig),
        this.renderLabel(label, themeConfig),
      ]
    );
  }
  // Render value with unit
  renderValueWithUnit(value, unit, themeConfig) {
    const isCircleMode = themeConfig.ICON_TYPE === "circle";
    return React.createElement(
      "div",
      {
        key: "metric-value",
        style: {
          fontSize: themeConfig.VALUE_FONT_SIZE,
          fontWeight: "bold",
          display: "flex",
          alignItems: "baseline",
          justifyContent: isCircleMode ? "flex-start" : "center",
          gap: "2px",
          width: "100%",
        },
      },
      [
        // Value
        React.createElement(
          "span",
          {
            key: "value",
            style: {
              color: themeConfig.PRIMARY,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            },
            title: value,
          },
          value
        ),
        // Unit
        unit && React.createElement(
          "span",
          {
            key: "unit",
            style: {
              color: themeConfig.TEXT_SECONDARY,
              fontSize: themeConfig.UNIT_FONT_SIZE,
              fontWeight: "normal",
            },
          },
          unit
        ),
      ].filter(Boolean)
    );
  }
  // Render label
  renderLabel(label, themeConfig) {
    return React.createElement(
      "div",
      {
        key: "metric-label",
        style: {
          color: themeConfig.TEXT_PRIMARY,
          fontSize: themeConfig.FONT_SIZE,
          fontWeight: "bold",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
        },
        title: label,
      },
      label
    );
  }
  // Render change indicator
  renderChangeIndicator(change, themeConfig) {
    const type = this.getChangeType(change);
    const changeColor = type === "positive" 
      ? themeConfig.SUCCESS 
      : type === "negative" 
        ? themeConfig.ERROR 
        : themeConfig.TEXT_SECONDARY;
    return React.createElement(
      "div",
      {
        key: "metric-change",
        style: {
          fontSize: themeConfig.CHANGE_FONT_SIZE,
          fontWeight: "500",
          color: changeColor,
          textAlign: "center",
        },
      },
      change
    );
  }
  // Get container style based on icon type
  getContainerStyle(themeConfig) {
    const isNormalMode = themeConfig.ICON_TYPE === "normal";
    return {
      height: "100%",
      width: "100%",
      overflow: "hidden",
      display: "flex",
      flexDirection: isNormalMode ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      gap: isNormalMode ? themeConfig.ELEMENT_GAP : undefined,
    };
  }
  render() {
    const { data } = this.props;
    const themeConfig = this.getMetricThemeConfig();
    if (!data) {
      return this.renderEmptyState(themeConfig);
    }
    const parsedData = this.parseUnifiedData(data);
    const elements = this.buildRenderElements(parsedData, themeConfig);
    const containerStyle = this.getContainerStyle(themeConfig);
    return React.createElement(
      "div",
      { style: containerStyle },
      elements.map(item =>
        React.createElement(
          React.Fragment,
          { key: item.key },
          item.element
        )
      )
    );
  }
}
window.MetricCard = MetricCard;

// KPI indicator card - Specifically for displaying key performance indicators, supports multiple indicators display and target value comparison
class KPICard extends React.Component {
  constructor(props) {
    super(props);
  }
  getKPIThemeConfig() {
    const config = this.props.dashboardConfig;
    const baseFontSize = parseFloat(config.BASE_FONT_SIZE);
    const iconSize = `${baseFontSize * 1.25}px`;
    return {
      FONT_SIZE: `${baseFontSize}px`,
      LABEL_FONT_SIZE_FIRST: `${baseFontSize * 1.5}px`,
      VALUE_FONT_SIZE_FIRST: `${baseFontSize * 1.5}px`,
      ICON_SIZE_FIRST: iconSize,
      LABEL_FONT_SIZE: `${baseFontSize}px`,
      VALUE_FONT_SIZE: `${baseFontSize}px`,
      ICON_SIZE: iconSize,
      UNIT_FONT_SIZE: `${baseFontSize}px`,
      ELEMENT_GAP: `${parseFloat(config.CARD_GAP) * 0.75}px`,
      ICON_GAP: `${parseFloat(config.CARD_GAP) * 0.75}px`,
      CELL_PADDING_RIGHT: "5em",
      TEXT_PRIMARY: config.COLORS_TEXT_PRIMARY,
      TEXT_SECONDARY: config.COLORS_TEXT_SECONDARY,
      SUCCESS: config.COLORS_SUCCESS,
      ERROR: config.COLORS_ERROR,
      WARNING: config.COLORS_WARNING,
      PRIMARY: config.COLORS_PRIMARY,
    };
  }
  static async preprocessData(data) {
    return data;
  }
  // Validate icon duplication and collect warnings
  validateIconDuplication(indicators) {
    if (!indicators || !Array.isArray(indicators)) return;
    const iconCounts = {};
    const duplicatedIcons = [];
    // Count icon occurrences
    indicators.forEach((indicator, index) => {
      if (indicator.icon) {
        const icon = indicator.icon;
        if (!iconCounts[icon]) {
          iconCounts[icon] = [];
        }
        iconCounts[icon].push(index);
      }
    });
    // Find duplicated icons
    Object.entries(iconCounts).forEach(([icon, indices]) => {
      if (indices.length >= 2) {
        duplicatedIcons.push({
          icon,
          count: indices.length,
          positions: indices.map(i => i + 1).join(', ') // Convert to 1-based indexing
        });
      }
    });
    // Collect warnings to ErrorCollector
    if (duplicatedIcons.length > 0 && window.ErrorCollector) {
      duplicatedIcons.forEach(({ icon, count, positions }) => {
        const warningMessage = language.t("warning.kpiDuplicateIcon", "KPI card has duplicate icon '{icon}' used {count} times at positions: {positions}. Consider using different icons for better visual distinction.", {
          icon,
          count,
          positions
        });
        window.ErrorCollector.collectWarning({
          type: "KPI_CONFIG_WARNING",
          category: "COMPONENT_RENDER",
          message: warningMessage,
          details: {
            cardId: this.props.cardId,
            cardType: "KPICard",
            duplicatedIcon: icon,
            count,
            positions
          },
          source: "KPICard"
        });
      });
    }
    return duplicatedIcons;
  }
  // Parse data format
  parseUnifiedData(data) {
    // If already in correct format, return directly
    if (data && data.indicators) {
      return data;
    }
    // If not in correct format, return empty data
    return { indicators: [] };
  }
  getKPIStatus(value, target) {
    if (!target) return "good";
    const ratio = value / target;
    if (ratio >= 0.9) return "excellent";
    if (ratio >= 0.7) return "good";
    if (ratio >= 0.5) return "warning";
    return "danger";
  }
  // Format numeric display
  formatValue(value) {
    if (typeof value === "string") return value;
    if (value >= 100000000) {
      return (value / 100000000).toFixed(2) + "亿";
    }
    if (value >= 10000) {
      return (value / 10000).toFixed(2) + "万";
    }
    return value.toLocaleString();
  }
  // Render icon - Support tabler-icons and emoji
  renderIcon(icon, iconSize, iconColor) {
    if (!icon) return null;
    const themeConfig = this.getKPIThemeConfig();
    // Parse main indicator (first row) icon size value (remove px unit)
    const mainIconSizeValue = parseFloat(themeConfig.ICON_SIZE_FIRST);
    // Create icon container style - All icon containers use main indicator size
    const containerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${mainIconSizeValue}px`,
      height: `${mainIconSizeValue}px`,
    };
    // Use configured icon color or default color
    const iconColorStyle = iconColor || this.getKPIThemeConfig().TEXT_PRIMARY;
    // Check if it's a tabler-icons class name (starts with ti-)
    if (typeof icon === "string" && icon.startsWith("ti-")) {
      return React.createElement(
        "div",
        {
          style: containerStyle,
        },
        React.createElement("i", {
          className: `ti ${icon}`,
          style: {
            fontSize: iconSize,
            color: iconColorStyle,
          },
        })
      );
    }
    // Otherwise render in original way (emoji or other characters)
    return React.createElement(
      "div",
      {
        style: containerStyle,
      },
      React.createElement(
        "span",
        {
          style: {
            fontSize: iconSize,
            color: iconColorStyle,
          },
        },
        icon
      )
    );
  }
  renderKPIRow(kpi, index) {
    const { label, value, target, unit = "", icon, iconColor } = kpi;
    const status = this.getKPIStatus(value, target);
    const themeConfig = this.getKPIThemeConfig();
    // Status colors
    const getStatusColor = status => {
      const statusColors = {
        excellent: themeConfig.SUCCESS,
        good: themeConfig.PRIMARY,
        warning: themeConfig.WARNING,
        danger: themeConfig.ERROR,
      };
      return statusColors[status] || themeConfig.TEXT_PRIMARY;
    };
    // First row uses larger font
    const isFirst = index === 0;
    const fontSize = isFirst ? themeConfig.LABEL_FONT_SIZE_FIRST : themeConfig.LABEL_FONT_SIZE;
    const valueFontSize = isFirst ? themeConfig.VALUE_FONT_SIZE_FIRST : themeConfig.VALUE_FONT_SIZE;
    const iconSize = isFirst ? themeConfig.ICON_SIZE_FIRST : themeConfig.ICON_SIZE;
    return React.createElement(
      "tr",
      {
        key: `kpi-row-${index}`,
      },
      [
        // Left cell: icon and label
        React.createElement(
          "td",
          {
            key: "label-cell",
            style: {
              textAlign: "left",
              verticalAlign: "middle",
              paddingRight: themeConfig.CELL_PADDING_RIGHT,
              whiteSpace: "nowrap",
            },
          },
          React.createElement(
            "div",
            {
              key: "label-content",
              style: {
                display: "flex",
                alignItems: "center",
                gap: themeConfig.ICON_GAP,
              },
            },
            [
              // Icon (if any)
              icon && this.renderIcon(icon, iconSize, iconColor),
              // Label
              React.createElement(
                "span",
                {
                  key: "label",
                  style: {
                    fontSize: fontSize,
                    fontWeight: isFirst ? "bold" : "500", // Label bold, first row bolder
                    color: isFirst ? themeConfig.TEXT_PRIMARY : themeConfig.TEXT_SECONDARY,
                  },
                },
                label
              ),
            ]
          )
        ),
        // Right cell: value
        React.createElement(
          "td",
          {
            key: "value-cell",
            style: {
              textAlign: "right",
              verticalAlign: "middle",
              whiteSpace: "nowrap",
            },
          },
          React.createElement(
            "div",
            {
              key: "value",
              style: {
                display: "flex",
                alignItems: "baseline",
                justifyContent: "flex-end",
                gap: "2px",
              },
            },
            [
              // Value - Use status color
              React.createElement(
                "span",
                {
                  key: "value",
                  style: {
                    fontSize: valueFontSize,
                    fontWeight: "bold",
                    color: getStatusColor(status),
                  },
                },
                this.formatValue(value)
              ),
              // Unit - Use light color
              unit &&
                React.createElement(
                  "span",
                  {
                    key: "unit",
                    style: {
                      fontSize: themeConfig.UNIT_FONT_SIZE,
                      fontWeight: "normal",
                      color: themeConfig.TEXT_SECONDARY,
                    },
                  },
                  unit
                ),
            ]
          )
        ),
      ]
    );
  }
  componentDidMount() {
    // Validate icon duplication when component mounts
    if (this.props.data) {
      const parsedData = this.parseUnifiedData(this.props.data);
      const { indicators = [] } = parsedData;
      this.validateIconDuplication(indicators);
    }
  }
  render() {
    const { data } = this.props;
    const themeConfig = this.getKPIThemeConfig();
    if (!data) {
      return React.createElement(
        "div",
        {
          style: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: themeConfig.TEXT_SECONDARY,
            fontSize: themeConfig.FONT_SIZE,
          },
        },
        null
      );
    }
    const parsedData = this.parseUnifiedData(data);
    const { indicators = [] } = parsedData;
    return React.createElement(
      "div",
      {
        style: {
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      React.createElement(
        "table",
        {
          style: {
            width: "auto",
            borderCollapse: "separate", // Change to separate to support border-spacing
            borderSpacing: "0 0", // Remove original spacing, use spacing rows for control
            margin: "0 auto",
          },
        },
        React.createElement(
          "tbody",
          { key: "kpi-tbody" },
          indicators
            .map((indicator, index) => [
              this.renderKPIRow(indicator, index),
              // Add spacing rows for all indicators except the last one
              index < indicators.length - 1 &&
                React.createElement("tr", {
                  key: `spacer-${index}`,
                  style: {
                    height: themeConfig.ELEMENT_GAP,
                  },
                }),
            ])
            .flat()
            .filter(Boolean)
        )
      )
    );
  }
}
window.KPICard = KPICard;

// Text card - Suitable for displaying text content, supports multiple paragraphs and custom styles
class TextCard extends React.Component {
  constructor(props) {
    super(props);
  }
  getTextThemeConfig() {
    const config = this.props.dashboardConfig;
    return {
      FONT_SIZE: config.BASE_FONT_SIZE,
      FONT_FAMILY: config.BODY_FONT_FAMILY,
      LINE_HEIGHT: "1.5",
      PARAGRAPH_MARGIN_BOTTOM: config.CARD_GAP,
      CODE_PADDING: config.CARD_GAP,
      CODE_BORDER_RADIUS: config.CARD_BORDER_RADIUS,
      TEXT_PRIMARY: config.COLORS_TEXT_PRIMARY,
      TEXT_SECONDARY: config.COLORS_TEXT_SECONDARY,
      PRIMARY: config.COLORS_PRIMARY,
      CODE_BACKGROUND: `rgba(64, 158, 255, 0.1)`,
    };
  }
  static async preprocessData(data) {
    return data;
  }
  parseUnifiedData(data) {
    if (typeof data === "string") {
      return { content: [data] };
    }
    if (data && data.content && Array.isArray(data.content)) {
      return data;
    }
    // Ensure content is an array
    if (data && data.content && !Array.isArray(data.content)) {
      return { ...data, content: [data.content] };
    }
    // If not in correct format, return default data
    const themeConfig = this.getTextThemeConfig();
    return {
      content: [],
      textAlign: "left",
      fontSize: themeConfig.FONT_SIZE,
      color: themeConfig.TEXT_PRIMARY,
      fontWeight: "normal",
      lineHeight: themeConfig.LINE_HEIGHT,
    };
  }
  renderTextContent(content) {
    if (!Array.isArray(content)) return null;
    const themeConfig = this.getTextThemeConfig();
    return content.map((text, index) =>
      React.createElement(
        "div",
        {
          key: index,
          style: {
            marginBottom: index < content.length - 1 ? themeConfig.PARAGRAPH_MARGIN_BOTTOM : "0",
          },
        },
        text
      )
    );
  }
  parseSimpleMarkdown(text) {
    // Simple markup parsing: **bold**, *italic*, `code`
    const parts = [];
    let partIndex = 0;
    const themeConfig = this.getTextThemeConfig();
    // Handle bold **text**
    text = text.replace(/\*\*(.*?)\*\*/g, (match, content, offset) => {
      const placeholder = `__BOLD_${partIndex}__`;
      parts[partIndex] = React.createElement("strong", { key: `bold-${partIndex}` }, content);
      partIndex++;
      return placeholder;
    });
    // Handle italic *text*
    text = text.replace(/\*(.*?)\*/g, (match, content, offset) => {
      const placeholder = `__ITALIC_${partIndex}__`;
      parts[partIndex] = React.createElement("em", { key: `italic-${partIndex}` }, content);
      partIndex++;
      return placeholder;
    });
    // Handle code `text`
    text = text.replace(/`(.*?)`/g, (match, content, offset) => {
      const placeholder = `__CODE_${partIndex}__`;
      parts[partIndex] = React.createElement(
        "code",
        {
          key: `code-${partIndex}`,
          style: {
            backgroundColor: themeConfig.CODE_BACKGROUND,
            padding: themeConfig.CODE_PADDING,
            borderRadius: themeConfig.CODE_BORDER_RADIUS,
            fontSize: "0.9em",
            fontFamily: "monospace",
          },
        },
        content
      );
      partIndex++;
      return placeholder;
    });
    // Handle line breaks
    const lines = text.split("\n");
    const result = [];
    lines.forEach((line, lineIndex) => {
      const lineParts = [];
      let lastIndex = 0;
      // Replace placeholders
      line.replace(/__(\w+)_(\d+)__/g, (match, type, index, offset) => {
        if (offset > lastIndex) {
          lineParts.push(line.slice(lastIndex, offset));
        }
        lineParts.push(parts[parseInt(index)]);
        lastIndex = offset + match.length;
        return match;
      });
      if (lastIndex < line.length) {
        lineParts.push(line.slice(lastIndex));
      }
      result.push(React.createElement("div", { key: `line-${lineIndex}` }, lineParts.length > 0 ? lineParts : line));
    });
    return result;
  }
  render() {
    const { data } = this.props;
    const themeConfig = this.getTextThemeConfig();
    if (!data) {
      return React.createElement(
        "div",
        {
          style: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: themeConfig.TEXT_SECONDARY,
            fontSize: themeConfig.FONT_SIZE,
          },
        },
        null
      );
    }
    const parsedData = this.parseUnifiedData(data);
    const { content = [], textAlign = "left", fontSize = themeConfig.FONT_SIZE, color = themeConfig.TEXT_PRIMARY, fontWeight = "normal", lineHeight = themeConfig.LINE_HEIGHT } = parsedData;
    return React.createElement(
      "div",
      {
        style: {
          height: "100%",
          overflow: "auto",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontSize: fontSize,
            lineHeight: lineHeight,
            textAlign: textAlign,
            color: color,
            fontWeight: fontWeight,
            fontFamily: themeConfig.FONT_FAMILY,
            wordWrap: "break-word",
            wordBreak: "break-word",
          },
        },
        this.renderTextContent(content)
      )
    );
  }
}
window.TextCard = TextCard;

// Image card - Used to display image content, supports multiple display modes and style configurations
class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      imageError: false,
      loading: false,
    };
  }
  getImageThemeConfig() {
    const config = this.props.dashboardConfig;
    const fontSize = config.BASE_FONT_SIZE;
    return {
      FONT_SIZE: fontSize,
      ERROR_ICON_SIZE: fontSize,
      ERROR_ICON_MARGIN: config.CARD_GAP,
      TEXT_SECONDARY: config.COLORS_TEXT_SECONDARY,
      ERROR: config.COLORS_ERROR,
    };
  }
  static async preprocessData(data) {
    return data;
  }
  componentDidMount() {
    const { data } = this.props;
    const parsedData = this.parseUnifiedData(data);
    if (parsedData.src) {
      this.setState({ loading: true });
    }
  }
  // Parse data format
  parseUnifiedData(data) {
    // String directly as image URL
    if (typeof data === "string") {
      return { src: data };
    }
    // If already in correct format, return directly
    if (data && typeof data === "object") {
      return {
        src: data.src || "",
        alt: data.alt || "Image",
        fit: data.fit || "contain", // contain, cover, fill, scale-down, none
        position: data.position || "center", // center, top, bottom, left, right
        borderRadius: data.borderRadius || "0",
        opacity: data.opacity || 1,
        ...data,
      };
    }
    // Default data
    return {
      src: "",
      alt: "Image",
      fit: "contain",
      position: "center",
      borderRadius: "0",
      opacity: 1,
    };
  }
  // Handle image load success
  onImageLoad = () => {
    this.setState({
      imageLoaded: true,
      imageError: false,
      loading: false,
    });
  };
  // Handle image load failure
  onImageError = () => {
    this.setState({
      imageError: true,
      imageLoaded: false,
      loading: false,
    });
  };
  // Handle image load start
  onImageLoadStart = () => {
    this.setState({
      loading: true,
      imageError: false,
    });
  };
  // Render placeholder content
  renderPlaceholderContent() {
    return React.createElement("div", {
      style: {
        width: "100%",
        height: "100%",
        opacity: 0.6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      dangerouslySetInnerHTML: {
        __html: `<svg width="100%" height="100%" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" transform="translate(0 0.644531)" fill="#F5F5F5"/>
            <g clip-path="url(#clip0_1523_1075)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.9314 32.1412C26.3485 33.2823 25.8076 34.9424 25.4444 37.0812C24.9538 39.9702 24.8483 43.3763 25.2113 46.7587C25.5754 50.1511 26.3953 53.3785 27.6552 55.9705C27.9377 56.5518 28.2365 57.0896 28.55 57.5838C28.551 57.283 28.5534 56.9801 28.5559 56.677C28.5567 56.579 28.5575 56.4809 28.5583 56.3829C28.5615 55.9522 28.5644 55.57 28.5644 55.234C28.5644 53.763 28.7233 51.2491 30.3367 49.0879C32.0872 46.7429 34.9745 45.5275 38.8748 45.5275H43.5939C41.5288 42.9323 38.218 39.2985 34.6954 36.4277C32.8451 34.9198 31.0329 33.7021 29.3907 32.9389C28.4054 32.481 27.59 32.237 26.9314 32.1412ZM59.3251 45.5275H64.0442C67.9445 45.5275 70.8317 46.7429 72.5823 49.0879C74.1957 51.2491 74.3545 53.763 74.3545 55.234C74.3545 55.57 74.3574 55.9522 74.3607 56.3829C74.3615 56.4809 74.3623 56.5789 74.3631 56.6769C74.3656 56.9801 74.368 57.2829 74.3689 57.5838C74.6825 57.0896 74.9812 56.5518 75.2638 55.9705C76.5237 53.3785 77.3436 50.1511 77.7077 46.7587C78.0707 43.3763 77.9652 39.9702 77.4746 37.0812C77.1114 34.9424 76.5705 33.2823 75.9876 32.1412C75.329 32.237 74.5136 32.481 73.5283 32.9389C71.8861 33.7021 70.0739 34.9198 68.2236 36.4277C64.701 39.2985 61.3901 42.9323 59.3251 45.5275ZM69.4353 67.2021C69.0601 67.3429 68.6761 67.4654 68.2932 67.5721C66.7937 67.9901 65.0501 68.2377 63.3361 68.2997C61.6299 68.3614 59.8018 68.2449 58.1591 67.8432C56.634 67.4702 54.6817 66.71 53.4692 65.021C52.8904 64.2148 52.3563 63.8649 52.0384 63.7147C51.899 63.6488 51.7932 63.6175 51.7312 63.6033L51.4595 63.6406L51.1878 63.6033C51.1258 63.6175 51.02 63.6488 50.8806 63.7147C50.5627 63.8649 50.0285 64.2148 49.4498 65.021C48.2373 66.71 46.285 67.4702 44.7599 67.8432C43.1172 68.2449 41.2891 68.3614 39.5829 68.2997C37.8689 68.2377 36.1253 67.9901 34.6258 67.5721C34.2429 67.4654 33.8589 67.3429 33.4837 67.2021C33.1468 68.5861 32.8422 69.6304 32.5714 70.4095L32.5708 70.4111C35.4459 73.7358 41.9777 78.7009 51.3746 78.4484L51.4595 78.4461L51.5444 78.4484C60.9412 78.7009 67.4731 73.7358 70.3482 70.4111L70.3476 70.4095C70.0768 69.6304 69.7722 68.5861 69.4353 67.2021ZM27.383 65.5421C25.0156 63.8047 23.2513 61.3679 21.9718 58.7356C20.312 55.3209 19.3471 51.3428 18.9276 47.4337C18.507 43.5148 18.6192 39.5235 19.2138 36.0222C19.7923 32.6157 20.8924 29.2844 22.7491 27.022L23.4832 26.1276L24.6209 25.9187C27.2072 25.4439 29.8054 26.1601 32.0533 27.2048C34.3433 28.2691 36.6093 29.8326 38.6868 31.5257C42.033 34.2527 45.1404 37.5229 47.3955 40.1963C47.8028 40.099 48.1874 40.0291 48.5265 39.977C49.6448 39.8049 50.7232 39.7618 51.4595 39.7781C52.1958 39.7618 53.2742 39.8049 54.3925 39.977C54.7315 40.0291 55.1162 40.099 55.5235 40.1963C57.7786 37.5229 60.886 34.2527 64.2322 31.5257C66.3097 29.8326 68.5757 28.2691 70.8657 27.2048C73.1136 26.1601 75.7118 25.4439 78.298 25.9187L79.4358 26.1276L80.1699 27.022C82.0266 29.2844 83.1267 32.6157 83.7052 36.0222C84.2997 39.5235 84.412 43.5148 83.9914 47.4337C83.5719 51.3428 82.607 55.3209 80.9472 58.7356C79.6677 61.3679 77.9034 63.8047 75.536 65.5421C75.781 66.5618 75.9931 67.3242 76.1681 67.8816L79.3992 68.3561L76.69 72.4966C73.7984 76.9155 64.9454 85.0981 51.4595 84.7709C37.9736 85.0981 29.1205 76.9155 26.229 72.4966L23.5198 68.3561L26.7508 67.8816C26.9259 67.3242 27.1379 66.5618 27.383 65.5421ZM35.4002 52.8713C35.0591 53.3281 34.8843 54.0869 34.8843 55.234C34.8843 55.5966 34.8812 56.0017 34.878 56.4228L34.8779 56.4312C34.8646 58.1714 34.8572 59.2234 34.9625 60.0483C35.034 60.6082 35.1405 60.8946 35.2557 61.0843C35.2709 61.0926 35.2881 61.1017 35.3076 61.1116C35.5136 61.2166 35.8483 61.3495 36.3219 61.4815C37.2684 61.7453 38.5101 61.9341 39.8113 61.9812C41.1201 62.0286 42.3369 61.9269 43.2594 61.7014C44.0955 61.4969 44.3456 61.2784 44.3513 61.2846C46.5267 58.2844 49.3729 57.175 51.4595 57.2781C53.5461 57.175 56.3922 58.2845 58.5677 61.2847C58.5733 61.2786 58.8235 61.4969 59.6596 61.7014C60.5821 61.9269 61.7989 62.0286 63.1077 61.9812C64.4089 61.9341 65.6506 61.7453 66.5971 61.4815C67.0707 61.3495 67.4054 61.2166 67.6114 61.1116C67.6308 61.1017 67.6481 61.0926 67.6633 61.0843C67.7785 60.8946 67.885 60.6082 67.9565 60.0483C68.0618 59.2234 68.0544 58.1714 68.0411 56.4312L68.041 56.4221C68.0378 56.0012 68.0347 55.5964 68.0347 55.234C68.0347 54.0869 67.8599 53.3281 67.5188 52.8713C67.315 52.5982 66.627 51.8501 64.0442 51.8501H38.8748C36.292 51.8501 35.604 52.5982 35.4002 52.8713Z" fill="#E9E9E9"/>
            <path d="M13.4036 29.3616C13.7296 29.9246 14.5906 29.6939 14.5914 29.0433L14.596 25.2805C14.5962 25.0536 14.7173 24.8439 14.9137 24.7302L18.17 22.8449C18.7331 22.5189 18.5024 21.6579 17.8518 21.6571L14.089 21.6525C13.8621 21.6523 13.6524 21.5312 13.5387 21.3348L11.6534 18.0785C11.3274 17.5154 10.4664 17.7461 10.4656 18.3967L10.461 22.1595C10.4607 22.3864 10.3397 22.5961 10.1433 22.7098L6.88693 24.5951C6.32385 24.9211 6.55456 25.7821 7.2052 25.7829L10.968 25.7875C11.1949 25.7878 11.4045 25.9088 11.5183 26.1052L13.4036 29.3616Z" fill="#E9E9E9"/>
            <path d="M88.6057 71.1174C88.6062 71.5512 89.1802 71.705 89.3975 71.3296L90.6544 69.1587C90.7302 69.0278 90.87 68.9471 91.0213 68.9469L93.5298 68.9439C93.9635 68.9433 94.1174 68.3693 93.742 68.152L91.5711 66.8951C91.4401 66.8193 91.3594 66.6795 91.3592 66.5282L91.3562 64.0197C91.3557 63.586 90.7817 63.4322 90.5643 63.8075L89.3074 65.9785C89.2316 66.1094 89.0919 66.1901 88.9406 66.1903L86.4321 66.1933C85.9983 66.1938 85.8445 66.7678 86.2199 66.9852L88.3908 68.2421C88.5217 68.3179 88.6024 68.4576 88.6026 68.6089L88.6057 71.1174Z" fill="#E9E9E9"/>
            </g>
            <defs>
            <clipPath id="clip0_1523_1075">
            <rect x="5" y="5.64453" width="90" height="90" rx="4.74074" fill="white"/>
            </clipPath>
            </defs>
            </svg>`,
      },
    });
  }
  // Render placeholder
  renderPlaceholder() {
    const { dashboardConfig } = this.props;
    return React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        },
      },
      [
        // SVG icon container, fixed size
        React.createElement(
          "div",
          {
            key: "icon-container",
            style: {
              width: "40px",
              height: "40px",
              marginBottom: "8px",
            },
          },
          this.renderPlaceholderContent()
        ),
        // Custom text
        React.createElement(
          "div",
          {
            key: "text",
            style: {
              color: dashboardConfig.COLORS_TEXT_SECONDARY,
              fontSize: "12px",
            },
          },
          "Please configure image URL"
        ),
      ]
    );
  }
  // Render image loading error
  renderImageError() {
    const { dashboardConfig } = this.props;
    const config = dashboardConfig;
    return React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: config.COLORS_ERROR,
          fontSize: "12px",
          padding: "20px",
        },
      },
      [
        React.createElement(
          "div",
          {
            key: "icon",
            style: {
              fontSize: "24px",
              marginBottom: "8px",
            },
          },
          React.createElement("i", {
            className: "ti ti-photo-off",
            style: { fontSize: "24px", color: "inherit" },
          })
        ),
        React.createElement("div", { key: "text" }, language.t("error.imageLoadFailed", "Image loading failed")),
      ]
    );
  }
  render() {
    const { data } = this.props;
    const { imageError, loading, imageLoaded } = this.state;
    if (imageError) {
      return this.renderImageError();
    }
    // Show placeholder when no data or no image source
    if (!data) {
      const themeConfig = this.getImageThemeConfig();
      return React.createElement(
        "div",
        {
          style: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: themeConfig.TEXT_SECONDARY,
            fontSize: themeConfig.FONT_SIZE,
          },
        },
        "Image card"
      );
    }
    const parsedData = this.parseUnifiedData(data);
    if (!parsedData.src) {
      return this.renderPlaceholder();
    }
    return React.createElement(
      "div",
      {
        style: {
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        },
      },
      [
        // Placeholder - Show when image is loading or not loaded
        (loading || !imageLoaded) &&
          React.createElement(
            "div",
            {
              key: "placeholder-overlay",
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F5F5F5",
                zIndex: 1,
                borderRadius: parsedData.borderRadius,
              },
            },
            this.renderPlaceholderContent()
          ),
        // Image element
        React.createElement("img", {
          key: "image",
          src: parsedData.src,
          alt: parsedData.alt,
          onLoad: this.onImageLoad,
          onError: this.onImageError,
          onLoadStart: this.onImageLoadStart,
          style: {
            objectFit: parsedData.fit,
            objectPosition: parsedData.position,
            borderRadius: parsedData.borderRadius,
            opacity: imageLoaded ? parsedData.opacity : 0,
            width: "100%",
            height: "100%",
            display: "block",
            transition: "opacity 0.3s ease",
          },
        }),
      ]
    );
  }
}
window.ImageCard = ImageCard;

// Table card - Suitable for displaying detailed data lists and ranking information
class TableCard extends React.Component {
  getTableThemeConfig() {
    const config = this.props.dashboardConfig;
    return {
      CELL_MIN_WIDTH: config.TABLE_CELL_MIN_WIDTH,
      CELL_HEIGHT: config.TABLE_CELL_HEIGHT,
      CELL_PADDING: config.TABLE_CELL_PADDING,
      FONT_SIZE: config.TABLE_FONT_SIZE,
      BORDER_RADIUS: config.TABLE_BORDER_RADIUS,
      HEADER_BACKGROUND_OPACITY: 0.1,
      BORDER_LIGHT_OPACITY: 0.2,
      HOVER_BACKGROUND_OPACITY: 0.05,
      PRIMARY: config.COLORS_PRIMARY,
      TEXT_SECONDARY: config.COLORS_TEXT_SECONDARY,
      HEADER_BACKGROUND: config.TABLE_HEADER_BACKGROUND_COLOR,
      BORDER: config.TABLE_BORDER_COLOR,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      sortColumn: null, // Current sort column
      sortDirection: null, // 'asc' or 'desc'
      filters: {}, // Filter values for each column
      activeFilterPopup: null, // Currently active filter popup column
      filterPopupPosition: { top: 0, left: 0 }, // Filter popup position
      hoveredColumn: null, // Currently hovered column
      // Virtual scrolling state
      scrollTop: 0, // Current scroll position
      containerHeight: 0, // Container height
      startIndex: 0, // First visible row index
      endIndex: 0, // Last visible row index
    };
    // Refs for virtual scrolling
    this.tableContainerRef = React.createRef();
    this.virtualScrollRef = React.createRef();
    this.resizeObserver = null;
  }
  renderEmptyState() {
    const themeConfig = this.getTableThemeConfig();
    return React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: themeConfig.TEXT_SECONDARY,
          fontSize: themeConfig.FONT_SIZE,
        },
      },
      language.t("common.noData")
    );
  }
  // Virtual scrolling: Calculate visible range
  calculateVisibleRange = (scrollTop, containerHeight, rowHeight, totalRows) => {
    const overscan = 5; // Render extra rows for smooth scrolling
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const visibleRows = Math.ceil(containerHeight / rowHeight);
    const endIndex = Math.min(totalRows - 1, startIndex + visibleRows + overscan * 2);
    return { startIndex, endIndex };
  };
  // Virtual scrolling: Handle scroll event
  handleVirtualScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    const containerHeight = event.target.clientHeight;
    const themeConfig = this.getTableThemeConfig();
    const rowHeight = parseInt(themeConfig.CELL_HEIGHT);
    // Get current processed data length
    const { data } = this.props;
    if (!data) return;
    const parsedData = this.parseUnifiedData(data);
    const { columns, data: tableData } = parsedData;
    if (!Array.isArray(tableData)) return;
    // Apply filtering and sorting to get current data
    const { sortColumn, sortDirection, filters } = this.state;
    let processedData = [...tableData];
    processedData = this.filterData(processedData, filters, columns);
    if (sortColumn && sortDirection) {
      const sortColumnConfig = columns.find(col => col.dataIndex === sortColumn);
      if (sortColumnConfig) {
        processedData = this.sortData(processedData, sortColumnConfig, sortDirection);
      }
    }
    const totalRows = processedData.length;
    const { startIndex, endIndex } = this.calculateVisibleRange(scrollTop, containerHeight, rowHeight, totalRows);
    this.setState({
      scrollTop,
      containerHeight,
      startIndex,
      endIndex,
    });
  };
  // Virtual scrolling: Update container height on mount/resize (with debouncing)
  updateContainerHeight = () => {
    if (this.tableContainerRef.current) {
      const containerHeight = this.tableContainerRef.current.clientHeight;
      const containerWidth = this.tableContainerRef.current.clientWidth;
      // Skip update if dimensions haven't changed significantly
      if (Math.abs(containerHeight - this.state.containerHeight) < 5) {
        return;
      }
      const themeConfig = this.getTableThemeConfig();
      const rowHeight = parseInt(themeConfig.CELL_HEIGHT);
      // Get current processed data length
      const { data } = this.props;
      if (!data) return;
      const parsedData = this.parseUnifiedData(data);
      const { columns, data: tableData } = parsedData;
      if (!Array.isArray(tableData)) return;
      // Apply filtering and sorting to get current data
      const { sortColumn, sortDirection, filters } = this.state;
      let processedData = [...tableData];
      processedData = this.filterData(processedData, filters, columns);
      if (sortColumn && sortDirection) {
        const sortColumnConfig = columns.find(col => col.dataIndex === sortColumn);
        if (sortColumnConfig) {
          processedData = this.sortData(processedData, sortColumnConfig, sortDirection);
        }
      }
      const totalRows = processedData.length;
      const { startIndex, endIndex } = this.calculateVisibleRange(this.state.scrollTop, containerHeight, rowHeight, totalRows);
      this.setState({
        containerHeight,
        startIndex,
        endIndex,
      });
    }
  };
  // Debounced version of updateContainerHeight for resize events
  getDebouncedUpdateContainerHeight = () => {
    if (!this.debouncedUpdateContainerHeight) {
      this.debouncedUpdateContainerHeight = window.UTILS?.debounce ? 
        window.UTILS.debounce(this.updateContainerHeight, 100) : 
        this.updateContainerHeight;
    }
    return this.debouncedUpdateContainerHeight;
  };
  // Reset scroll position to top and update virtual scroll state
  resetScrollToTop = () => {
    if (this.tableContainerRef.current) {
      // Reset scroll position
      this.tableContainerRef.current.scrollTop = 0;
      // Update virtual scroll state
      const containerHeight = this.tableContainerRef.current.clientHeight;
      const themeConfig = this.getTableThemeConfig();
      const rowHeight = parseInt(themeConfig.CELL_HEIGHT);
      // Get current processed data length
      const { data } = this.props;
      if (!data) return;
      const parsedData = this.parseUnifiedData(data);
      const { columns, data: tableData } = parsedData;
      if (!Array.isArray(tableData)) return;
      // Apply filtering and sorting to get current data
      const { sortColumn, sortDirection, filters } = this.state;
      let processedData = [...tableData];
      processedData = this.filterData(processedData, filters, columns);
      if (sortColumn && sortDirection) {
        const sortColumnConfig = columns.find(col => col.dataIndex === sortColumn);
        if (sortColumnConfig) {
          processedData = this.sortData(processedData, sortColumnConfig, sortDirection);
        }
      }
      const totalRows = processedData.length;
      const { startIndex, endIndex } = this.calculateVisibleRange(0, containerHeight, rowHeight, totalRows);
      this.setState({
        scrollTop: 0,
        startIndex,
        endIndex,
      });
    }
  };
  static async preprocessData(data) {
    return data;
  }
  // Component lifecycle methods for virtual scrolling
  componentDidMount() {
    this.updateContainerHeight();
    // Set up window resize listener with debouncing
    const debouncedUpdate = this.getDebouncedUpdateContainerHeight();
    window.addEventListener('resize', debouncedUpdate);
    // Set up ResizeObserver for container size changes
    if (window.ResizeObserver && this.tableContainerRef.current) {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          // Use debounced update for ResizeObserver as well
          debouncedUpdate();
        }
      });
      this.resizeObserver.observe(this.tableContainerRef.current);
    }
  }
  componentWillUnmount() {
    // Clean up window resize listener
    const debouncedUpdate = this.getDebouncedUpdateContainerHeight();
    window.removeEventListener('resize', debouncedUpdate);
    // Clean up ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    // Clean up debounced function
    if (this.debouncedUpdateContainerHeight) {
      this.debouncedUpdateContainerHeight = null;
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // Check if filters have changed (excluding initial mount)
    const filtersChanged = prevState.filters !== this.state.filters && 
                          Object.keys(prevState.filters).length > 0;
    // Update virtual scroll when data, filters, or sort change
    if (prevProps.data !== this.props.data || 
        prevState.filters !== this.state.filters ||
        prevState.sortColumn !== this.state.sortColumn ||
        prevState.sortDirection !== this.state.sortDirection) {
      this.updateContainerHeight();
      // Reset scroll to top ONLY when filters change (backup mechanism)
      if (filtersChanged) {
        // Use setTimeout to ensure DOM is updated
        setTimeout(() => {
          this.resetScrollToTop();
        }, 0);
      }
    }
    // Set up ResizeObserver if it wasn't available during mount but is now available
    if (window.ResizeObserver && !this.resizeObserver && this.tableContainerRef.current) {
      const debouncedUpdate = this.getDebouncedUpdateContainerHeight();
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          debouncedUpdate();
        }
      });
      this.resizeObserver.observe(this.tableContainerRef.current);
    }
  }
  // Handle column sort
  handleSort = column => {
    if (!column.sortable) return;
    const { sortColumn, sortDirection } = this.state;
    let newDirection = "asc";
    if (sortColumn === column.dataIndex) {
      if (sortDirection === "asc") {
        newDirection = "desc";
      } else if (sortDirection === "desc") {
        // Reset sort
        this.setState({
          sortColumn: null,
          sortDirection: null,
        });
        return;
      }
    }
    this.setState({
      sortColumn: column.dataIndex,
      sortDirection: newDirection,
    });
  };
  // Handle column filter
  handleFilter = (column, value) => {
    if (!column.filterable) return;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [column.dataIndex]: value,
      },
    }), () => {
      // Reset scroll to top after filter is applied
      this.resetScrollToTop();
    });
  };
  // Show filter popup
  showFilterPopup = (column, event) => {
    if (!column.filterable) return;
    // Prevent event bubbling
    event.stopPropagation();
    // Get filter button position (precise reference point)
    const filterButton = event.currentTarget;
    const buttonRect = filterButton.getBoundingClientRect();
    // Calculate popup position relative to viewport, based on filter button
    const popupWidth = 200;
    const popupHeight = 150; // Estimated popup height
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const popupLeft = buttonCenterX - popupWidth / 2;
    const popupTop = buttonRect.bottom + 12;
    // Get container padding configuration
    const containerPadding = this.props.dashboardConfig?.GRID_CONTAINER_PADDING?.[0] || 8;
    // Ensure popup doesn't exceed viewport boundaries, reserve container padding
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    // Horizontal position adjustment
    let finalLeft = Math.max(containerPadding, Math.min(popupLeft, viewportWidth - popupWidth - containerPadding));
    // Vertical position adjustment - if not enough space below, show above button
    let finalTop = popupTop;
    if (popupTop + popupHeight > viewportHeight - containerPadding) {
      finalTop = buttonRect.top - popupHeight - 12;
      // If not enough space above either, force display below but adjust within bounds
      if (finalTop < containerPadding) {
        finalTop = Math.max(containerPadding, viewportHeight - popupHeight - containerPadding);
      }
    }
    this.setState({
      activeFilterPopup: column.dataIndex,
      filterPopupPosition: {
        top: finalTop,
        left: finalLeft,
      },
      filterButtonRect: buttonRect, // Save button position info
    });
  };
  // Close filter popup
  closeFilterPopup = () => {
    this.setState({
      activeFilterPopup: null,
      filterButtonRect: null,
    });
  };
  // Handle column hover
  handleColumnHover = columnIndex => {
    this.setState({
      hoveredColumn: columnIndex,
    });
  };
  // Handle column leave
  handleColumnLeave = () => {
    this.setState({
      hoveredColumn: null,
    });
  };
  // Sort data based on column type
  sortData = (data, column, direction) => {
    if (!column || !direction) return data;
    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];
      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return direction === "asc" ? -1 : 1;
      if (bValue == null) return direction === "asc" ? 1 : -1;
      let comparison = 0;
      switch (column.dataType) {
        case "number":
          comparison = Number(aValue) - Number(bValue);
          break;
        case "date":
          comparison = new Date(aValue) - new Date(bValue);
          break;
        case "time":
          // Use timestamp for comparison
          const timestampA = this.getTimeTimestamp(aValue);
          const timestampB = this.getTimeTimestamp(bValue);
          comparison = timestampA - timestampB;
          break;
        case "string":
        default:
          comparison = String(aValue).localeCompare(String(bValue));
          break;
      }
      return direction === "asc" ? comparison : -comparison;
    });
  };
  // Get time timestamp for sorting
  getTimeTimestamp = value => {
    if (!value) return 0;
    const today = new Date().toISOString().split("T")[0];
    // If it's a datetime string, extract time part
    if (value.includes("T") || value.includes(" ")) {
      const timePart = value.split(/[T ]/)[1];
      if (timePart) {
        const timeMatch = timePart.match(/(\d{1,2}):(\d{1,2})/);
        if (timeMatch) {
          const timeStr = `${timeMatch[1].padStart(2, "0")}:${timeMatch[2].padStart(2, "0")}`;
          return new Date(`${today}T${timeStr}:00`).getTime();
        }
      }
    }
    // Direct time format
    const timeMatch = String(value).match(/(\d{1,2}):(\d{1,2})/);
    if (timeMatch) {
      const timeStr = `${timeMatch[1].padStart(2, "0")}:${timeMatch[2].padStart(2, "0")}`;
      return new Date(`${today}T${timeStr}:00`).getTime();
    }
    return 0;
  };
  // Filter number values with range support
  filterNumber = (cellValue, filterValue) => {
    const numValue = Number(cellValue);
    if (isNaN(numValue)) return false;
    // Check if it's range filtering
    if (filterValue.includes("-")) {
      const [minStr, maxStr] = filterValue.split("-");
      const min = minStr ? Number(minStr) : -Infinity;
      const max = maxStr ? Number(maxStr) : Infinity;
      return numValue >= min && numValue <= max;
    } else {
      // Single number filtering, supports contains matching
      return numValue.toString().includes(filterValue);
    }
  };
  // Filter date values with range support
  filterDate = (cellValue, filterValue) => {
    const cellDate = new Date(cellValue);
    if (isNaN(cellDate.getTime())) return false;
    // Check if it's timestamp format (comma separated)
    if (filterValue.includes(",")) {
      const [startTs, endTs] = filterValue.split(",");
      const cellTimestamp = cellDate.getTime();
      // Handle single-sided ranges
      if (startTs && !endTs) {
        // Only start timestamp, no end limit
        const startTimestamp = parseInt(startTs);
        return !isNaN(startTimestamp) && cellTimestamp >= startTimestamp;
      } else if (!startTs && endTs) {
        // Only end timestamp, no start limit
        const endTimestamp = parseInt(endTs);
        return !isNaN(endTimestamp) && cellTimestamp <= endTimestamp;
      } else if (startTs && endTs) {
        // Both timestamps
        const startTimestamp = parseInt(startTs);
        const endTimestamp = parseInt(endTs);
        return !isNaN(startTimestamp) && !isNaN(endTimestamp) && cellTimestamp >= startTimestamp && cellTimestamp <= endTimestamp;
      }
    }
    // Compatible with traditional format (~ separator)
    if (filterValue.includes("~")) {
      const [startStr, endStr] = filterValue.split("~");
      const startDate = startStr ? new Date(startStr) : new Date("1900-01-01");
      const endDate = endStr ? new Date(endStr) : new Date("2100-12-31");
      return cellDate >= startDate && cellDate <= endDate;
    }
    // Single date filtering, supports date string contains matching
    return cellDate.toLocaleDateString().includes(filterValue) || cellValue.includes(filterValue);
  };
  // Filter time values with range support
  filterTime = (cellValue, filterValue) => {
    // Convert cell value to timestamp for comparison
    const getCellTimestamp = value => {
      if (!value) return null;
      const today = new Date().toISOString().split("T")[0];
      // If it's a datetime string, extract time part
      if (value.includes("T") || value.includes(" ")) {
        const timePart = value.split(/[T ]/)[1];
        if (timePart) {
          const timeMatch = timePart.match(/(\d{1,2}):(\d{1,2})/);
          if (timeMatch) {
            const timeStr = `${timeMatch[1].padStart(2, "0")}:${timeMatch[2].padStart(2, "0")}`;
            return new Date(`${today}T${timeStr}:00`).getTime();
          }
        }
      }
      // Direct time format
      const timeMatch = String(value).match(/(\d{1,2}):(\d{1,2})/);
      if (timeMatch) {
        const timeStr = `${timeMatch[1].padStart(2, "0")}:${timeMatch[2].padStart(2, "0")}`;
        return new Date(`${today}T${timeStr}:00`).getTime();
      }
      return null;
    };
    const cellTimestamp = getCellTimestamp(cellValue);
    if (cellTimestamp === null) return false;
    // Check if it's timestamp format (comma separated)
    if (filterValue.includes(",")) {
      const [startTs, endTs] = filterValue.split(",");
      // Handle single-sided ranges
      if (startTs && !endTs) {
        // Only start timestamp, no end limit
        const startTimestamp = parseInt(startTs);
        return !isNaN(startTimestamp) && cellTimestamp >= startTimestamp;
      } else if (!startTs && endTs) {
        // Only end timestamp, no start limit
        const endTimestamp = parseInt(endTs);
        return !isNaN(endTimestamp) && cellTimestamp <= endTimestamp;
      } else if (startTs && endTs) {
        // Both timestamps
        const startTimestamp = parseInt(startTs);
        const endTimestamp = parseInt(endTs);
        return !isNaN(startTimestamp) && !isNaN(endTimestamp) && cellTimestamp >= startTimestamp && cellTimestamp <= endTimestamp;
      }
    }
    // Compatible with traditional format (~ separator)
    if (filterValue.includes("~")) {
      const today = new Date().toISOString().split("T")[0];
      const [startStr, endStr] = filterValue.split("~");
      const startTime = startStr || "00:00";
      const endTime = endStr || "23:59";
      const startTimestamp = new Date(`${today}T${startTime}:00`).getTime();
      const endTimestamp = new Date(`${today}T${endTime}:59`).getTime();
      return cellTimestamp >= startTimestamp && cellTimestamp <= endTimestamp;
    }
    // Single time filtering, convert to string for contains matching
    const cellTimeStr = new Date(cellTimestamp).toTimeString().substr(0, 5);
    return cellTimeStr.includes(filterValue);
  };
  // Filter data based on column type
  filterData = (data, filters, columns) => {
    if (!filters || Object.keys(filters).length === 0) return data;
    return data.filter(row => {
      return Object.entries(filters).every(([columnKey, filterValue]) => {
        if (!filterValue || filterValue === "") return true;
        const column = columns.find(col => col.dataIndex === columnKey);
        if (!column) return true;
        const cellValue = row[columnKey];
        if (cellValue == null) return false;
        switch (column.dataType) {
          case "number":
            return this.filterNumber(cellValue, filterValue);
          case "date":
            return this.filterDate(cellValue, filterValue);
          case "time":
            return this.filterTime(cellValue, filterValue);
          case "string":
          default:
            return String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
        }
      });
    });
  };
  parseUnifiedData(data) {
    if (data && data.columns && data.data) {
      return data;
    }
    // If not in standard format, return empty data
    return {
      columns: [],
      data: [],
    };
  }
  render() {
    const { data } = this.props;
    if (!data) {
      return this.renderEmptyState();
    }
    const parsedData = this.parseUnifiedData(data);
    const { columns, data: tableData } = parsedData;
    if (!Array.isArray(tableData)) {
      return this.renderEmptyState();
    }
    if (tableData.length === 0) {
      return this.renderEmptyState();
    }
    // Apply filtering and sorting
    const { sortColumn, sortDirection, filters } = this.state;
    let processedData = [...tableData];
    // Apply filters first
    processedData = this.filterData(processedData, filters, columns);
    // Apply sorting
    if (sortColumn && sortDirection) {
      const sortColumnConfig = columns.find(col => col.dataIndex === sortColumn);
      if (sortColumnConfig) {
        processedData = this.sortData(processedData, sortColumnConfig, sortDirection);
      }
    }
    const themeConfig = this.getTableThemeConfig();
    return React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: `1px solid ${themeConfig.BORDER}`,
          borderRadius: themeConfig.BORDER_RADIUS,
          position: "relative",
        },
      },
      React.createElement(
        "div",
        {
          ref: this.tableContainerRef,
          className: "table-container",
          style: {
            flex: 1,
            overflowX: "auto",
            overflowY: "auto",
          },
          onScroll: this.handleVirtualScroll,
        },
        this.renderVirtualTable(columns, processedData)
      ),
      // Render filter popup
      this.state.activeFilterPopup &&
        React.createElement(FilterPopup, {
          column: columns.find(col => col.dataIndex === this.state.activeFilterPopup),
          value: this.state.filters[this.state.activeFilterPopup] || "",
          position: this.state.filterPopupPosition,
          buttonRect: this.state.filterButtonRect,
          dashboardConfig: this.props.dashboardConfig,
          onChange: value => {
            const column = columns.find(col => col.dataIndex === this.state.activeFilterPopup);
            this.handleFilter(column, value);
          },
          onClose: this.closeFilterPopup,
        })
    );
  }
  renderVirtualTable(columns, tableData) {
    const themeConfig = this.getTableThemeConfig();
    const rowHeight = parseInt(themeConfig.CELL_HEIGHT);
    const totalRows = tableData.length;
    const { startIndex, endIndex } = this.state;
    // Calculate virtual scroll dimensions
    const totalHeight = totalRows * rowHeight;
    const offsetY = startIndex * rowHeight;
    // Get visible data slice
    const visibleData = tableData.slice(startIndex, endIndex + 1);
    return React.createElement(
      "div",
      {
        style: {
          position: "relative",
          height: `${totalHeight}px`,
          width: "100%",
        },
      },
      // Virtual table container
      React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            transform: `translateY(${offsetY}px)`,
          },
        },
        React.createElement(
          "table",
          {
            style: {
              width: "100%",
              minWidth: `${columns.length * parseInt(themeConfig.CELL_MIN_WIDTH)}px`,
              borderCollapse: "collapse",
              fontSize: themeConfig.FONT_SIZE,
              margin: 0,
              tableLayout: "fixed",
            },
          },
          // Only render header when at the top
          startIndex === 0 && this.renderTableHeader(columns),
          this.renderVirtualTableBody(columns, visibleData, startIndex)
        )
      ),
      // Sticky header (always visible)
      React.createElement(
        "div",
        {
          style: {
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            backgroundColor: "transparent",
          },
        },
        React.createElement(
          "table",
          {
            style: {
              width: "100%",
              minWidth: `${columns.length * parseInt(themeConfig.CELL_MIN_WIDTH)}px`,
              borderCollapse: "collapse",
              fontSize: themeConfig.FONT_SIZE,
              margin: 0,
              tableLayout: "fixed",
            },
          },
          this.renderTableHeader(columns)
        )
      )
    );
  }
  renderTable(columns, tableData) {
    const themeConfig = this.getTableThemeConfig();
    return React.createElement(
      "table",
      {
        style: {
          width: "100%",
          minWidth: `${columns.length * parseInt(themeConfig.CELL_MIN_WIDTH)}px`, // Dynamically calculate minimum width
          borderCollapse: "collapse",
          fontSize: themeConfig.FONT_SIZE,
          margin: 0,
          tableLayout: "fixed",
        },
      },
      this.renderTableHeader(columns),
      this.renderTableBody(columns, tableData)
    );
  }
  renderTableHeader(columns) {
    const themeConfig = this.getTableThemeConfig();
    const { sortColumn, sortDirection, filters, hoveredColumn, activeFilterPopup } = this.state;
    return React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        {
          style: {
            background: themeConfig.HEADER_BACKGROUND,
            position: "sticky",
            top: 0,
            zIndex: 10,
            boxShadow: `0 1px 0 ${themeConfig.BORDER}`,
          },
        },
        columns.map((col, index) =>
          React.createElement(
            "th",
            {
              key: index,
              title: col.title, // Add title attribute to show complete column title
              style: {
                padding: themeConfig.CELL_PADDING,
                textAlign: "left",
                color: "#ffffff",
                fontWeight: "500",
                fontSize: themeConfig.FONT_SIZE,
                width: col.width || themeConfig.CELL_MIN_WIDTH,
                minWidth: themeConfig.CELL_MIN_WIDTH,
                verticalAlign: "middle",
              },
              onMouseEnter: () => this.handleColumnHover(index),
              onMouseLeave: () => this.handleColumnLeave(),
            },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: themeConfig.CELL_HEIGHT,
                },
              },
              // Header title
              React.createElement(
                "span",
                {
                  style: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flex: 1,
                  },
                },
                col.title
              ),
              // Control buttons container
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "8px",
                    gap: "2px",
                  },
                },
                // Filter button - only show on hover, when filtered, or when popup is active
                col.filterable &&
                  (hoveredColumn === index || filters[col.dataIndex] || activeFilterPopup === col.dataIndex) &&
                  React.createElement(
                    "div",
                    {
                      className: `table-control-button ${filters[col.dataIndex] || activeFilterPopup === col.dataIndex ? "active" : ""}`,
                      onClick: e => {
                        e.stopPropagation();
                        this.showFilterPopup(col, e);
                      },
                    },
                    React.createElement("i", {
                      className: filters[col.dataIndex] ? "ti ti-filter-filled" : "ti ti-filter",
                      style: {
                        fontSize: "12px",
                        color: "#ffffff",
                        opacity: filters[col.dataIndex] ? 1 : 0.7,
                      },
                    })
                  ),
                // Sort button - only show on hover, when active, or when popup is active
                col.sortable &&
                  (hoveredColumn === index || sortColumn === col.dataIndex || activeFilterPopup === col.dataIndex) &&
                  React.createElement(
                    "div",
                    {
                      className: `table-control-button ${sortColumn === col.dataIndex ? "active" : ""}`,
                      onClick: e => {
                        e.stopPropagation();
                        this.handleSort(col);
                      },
                    },
                    React.createElement("i", {
                      className: sortColumn === col.dataIndex ? (sortDirection === "asc" ? "ti ti-sort-ascending" : "ti ti-sort-descending") : "ti ti-arrows-sort",
                      style: {
                        fontSize: "12px",
                        color: "#ffffff",
                        opacity: sortColumn === col.dataIndex ? 1 : 0.7,
                      },
                    })
                  )
              )
            )
          )
        )
      )
    );
  }
  renderVirtualTableBody(columns, visibleData, startIndex) {
    const themeConfig = this.getTableThemeConfig();
    return React.createElement(
      "tbody",
      null,
      visibleData.map((row, relativeIndex) => {
        const actualRowIndex = startIndex + relativeIndex;
        return React.createElement(
          "tr",
          {
            key: actualRowIndex,
            className: "table-row",
            style: {
              "--hover-color": `${themeConfig.PRIMARY}${Math.round(themeConfig.HOVER_BACKGROUND_OPACITY * 255)
                .toString(16)
                .padStart(2, "0")}`,
            },
          },
          columns.map((col, colIndex) => {
            const cellValue = col.formatter ? col.formatter(row[col.dataIndex]) : row[col.dataIndex];
            return React.createElement(
              "td",
              {
                key: colIndex,
                title: String(cellValue || ""), // Add title attribute to show complete cell content
                style: {
                  padding: themeConfig.CELL_PADDING,
                  textAlign: "left",
                  borderBottom: `1px solid ${themeConfig.BORDER}`,
                  color: themeConfig.TEXT_SECONDARY,
                  width: col.width || themeConfig.CELL_MIN_WIDTH,
                  minWidth: themeConfig.CELL_MIN_WIDTH,
                  height: themeConfig.CELL_HEIGHT,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              },
              cellValue
            );
          })
        );
      })
    );
  }
  renderTableBody(columns, tableData) {
    const themeConfig = this.getTableThemeConfig();
    return React.createElement(
      "tbody",
      null,
      tableData.map((row, rowIndex) =>
        React.createElement(
          "tr",
          {
            key: rowIndex,
            className: "table-row",
            style: {
              "--hover-color": `${themeConfig.PRIMARY}${Math.round(themeConfig.HOVER_BACKGROUND_OPACITY * 255)
                .toString(16)
                .padStart(2, "0")}`,
            },
          },
          columns.map((col, colIndex) => {
            const cellValue = col.formatter ? col.formatter(row[col.dataIndex]) : row[col.dataIndex];
            return React.createElement(
              "td",
              {
                key: colIndex,
                title: String(cellValue || ""), // Add title attribute to show complete cell content
                style: {
                  padding: themeConfig.CELL_PADDING,
                  textAlign: "left",
                  borderBottom: `1px solid ${themeConfig.BORDER}`,
                  color: themeConfig.TEXT_SECONDARY,
                  width: col.width || themeConfig.CELL_MIN_WIDTH,
                  minWidth: themeConfig.CELL_MIN_WIDTH,
                  height: themeConfig.CELL_HEIGHT,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              },
              cellValue
            );
          })
        )
      )
    );
  }
}
window.TableCard = TableCard;

// Mobile touch handler for chart interactions
class ChartMobileTouchHandler {
  constructor(chartCard) {
    this.chartCard = chartCard;
    // Bind touch event handler
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }
  // Handle touch end event - remove interaction effects
  handleTouchEnd(event) {
    const chart = this.chartCard.chartInstanceRef.current;
    if (chart) {
      // Destroy tooltip and clear all interaction states after a short delay
      setTimeout(() => {
        if (chart) {
          // Hide tooltip first
          chart.dispatchAction({
            type: 'hideTip'
          });
          // Destroy tooltip component to ensure it's completely removed
          const tooltipComponent = chart.getModel().getComponent('tooltip');
          if (tooltipComponent) {
            chart.dispatchAction({
              type: 'updateAxisPointer',
              currTrigger: 'leave',
              x: -1,
              y: -1
            });
          }
          // Hide axisPointer for all axes
          chart.dispatchAction({
            type: 'updateAxisPointer',
            currTrigger: 'leave'
          });
          // Clear pie chart emphasis states
          chart.dispatchAction({
            type: 'downplay'
          });
          // Force clear any remaining tooltip DOM elements
          const tooltipDom = chart.getDom().querySelector('.echarts-tooltip');
          if (tooltipDom) {
            tooltipDom.style.display = 'none';
          }
        }
      }, 100);
    }
  }
  addEventListeners(element) {
    element.addEventListener("touchend", this.handleTouchEnd, { passive: true });
  }
  removeEventListeners(element) {
    element.removeEventListener("touchend", this.handleTouchEnd);
  }
  // Mobile-specific ECharts configuration
  static optimizeConfigForMobile(option) {
    // 创建深拷贝避免修改原配置
    const chartOption = JSON.parse(JSON.stringify(option));
    // 移动端强制设置 tooltip.confine: true
    if (!chartOption.tooltip) {
      chartOption.tooltip = {};
    }
    chartOption.tooltip.confine = true;
    return chartOption;
  }
}
// Chart card component - Chart display component integrated with ECharts functionality
class ChartCard extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chartInstanceRef = React.createRef();
    this.containerRef = React.createRef();
    this.resizeObserverRef = React.createRef();
    this.state = {
      error: null,
    };
    // Initialize mobile touch handler
    this.mobileTouchHandler = new ChartMobileTouchHandler(this);
  }
  static async preprocessData(data) {
    try {
      if (!ChartCard.isValidEChartsOption(data)) {
        throw new Error(language.t("error.invalidEChartsConfig", "Invalid ECharts configuration data"));
      }
      if (ChartCard.hasMapComponent(data)) {
        const mapNames = ChartCard.extractMapNames(data);
        if (window.MapManager) {
          const success = await window.MapManager.ensureMapsRegistered(mapNames);
          if (!success) {
            console.warn(`[ChartCard] Map preloading failed, but continue processing: ${mapNames.join(", ")}`);
          }
        } else {
          console.warn("[ChartCard] MapManager not found, skip map preloading");
        }
      }
      return data;
    } catch (error) {
      console.error("[ChartCard] Data preprocessing failed:", error);
      throw error;
    }
  }
  // Static method: Check if it's a valid ECharts configuration object
  static isValidEChartsOption(data) {
    return data && typeof data === "object" && !Array.isArray(data) && (data.series || data.xAxis || data.yAxis || data.title || data.tooltip || data.legend);
  }
  // Static method: Check if configuration contains map components
  static hasMapComponent(option) {
    if (!option) return false;
    // Check for map type in series
    if (option.series) {
      const hasMapSeries = Array.isArray(option.series) ? option.series.some(series => series.type === "map") : option.series.type === "map";
      if (hasMapSeries) return true;
    }
    // Check geo component
    if (option.geo && option.geo.map) {
      return true;
    }
    return false;
  }
  // Static method: Check if configuration contains pie charts
  static hasPieComponent(option) {
    if (!option) return false;
    // Check for pie type in series
    if (option.series) {
      const hasPieSeries = Array.isArray(option.series) ? option.series.some(series => series.type === "pie") : option.series.type === "pie";
      if (hasPieSeries) return true;
    }
    return false;
  }
  // Static method: Extract required map names from configuration
  static extractMapNames(option) {
    if (!option) return [];
    const mapNames = [];
    // Extract map names from series
    if (option.series) {
      const series = Array.isArray(option.series) ? option.series : [option.series];
      series.forEach(s => {
        if (s.type === "map" && s.map) {
          mapNames.push(s.map);
        }
      });
    }
    // Extract map names from geo component
    if (option.geo && option.geo.map) {
      mapNames.push(option.geo.map);
    }
    return [...new Set(mapNames)];
  }
  // Validate ECharts option and collect warnings without blocking execution
  validateEChartsOption(option) {
    const warnings = [];
    if (!option) return warnings;
    // Check if legend or visualMap components exist
    const hasLegendOrVisualMap = () => {
      let hasLegend = option.legend !== undefined;
      let hasVisualMap = option.visualMap !== undefined;
      if (option.series) {
        const series = Array.isArray(option.series) ? option.series : [option.series];
        series.forEach(item => {
          if (item.legend) hasLegend = true;
          if (item.visualMap) hasVisualMap = true;
        });
      }
      return { hasLegend, hasVisualMap };
    };
    // Validate legend configuration
    const validateLegend = (legend, prefix = "") => {
      const prefixStr = prefix ? `${prefix}.` : "";
      // Check if position is explicitly declared
      const hasPosition = legend.left !== undefined || legend.right !== undefined || legend.top !== undefined || legend.bottom !== undefined;
      if (!hasPosition) {
        warnings.push(`${prefixStr}${language.t("warning.legendPositionRequired", "legend must explicitly declare position (left/right/top/bottom)")}`);
      }
      // Recommend enabling scroll type
      if (!legend.type || legend.type !== "scroll") {
        warnings.push(`${prefixStr}${language.t("warning.legendScrollRecommended", "legend should enable type: 'scroll' to avoid taking up too much space")}`);
      }
    };
    // Validate grid configuration
    const validateGrid = grid => {
      // Check for deprecated containLabel configuration
      if (grid.containLabel === true) {
        warnings.push(language.t("warning.gridContainLabelDeprecated", "grid.containLabel is deprecated in ECharts v6.0.0, recommend using { left: 0, right: 0, top: 0, bottom: 0, containLabel: false } configuration"));
      }
      // Check if position properties are strings or percentages
      ["left", "right", "top", "bottom"].forEach(prop => {
        if (grid[prop] !== undefined && typeof grid[prop] === "string") {
          warnings.push(`grid.${prop} ${language.t("warning.gridPositionMustBeNumber", "must be a number, strings or percentages are not allowed")}`);
        }
      });
      // Check if any position property is not zero and warn user to verify necessity
      const nonZeroPositions = ["left", "right", "top", "bottom"].filter(prop => grid[prop] !== undefined && grid[prop] !== 0);
      if (nonZeroPositions.length > 0) {
        const message = language.t("warning.gridNonZeroPosition", "has non-zero position values ({positions}). Please carefully check if these configurations are necessary, as they may affect chart layout.", {
          positions: nonZeroPositions.map(prop => `${prop}: ${grid[prop]}`).join(", "),
        });
        warnings.push(`grid ${message}`);
      }
      // Check outerBounds configuration
      const { hasLegend, hasVisualMap } = hasLegendOrVisualMap();
      // Skip outerBounds validation for map charts
      const isMapChart = ChartCard.hasMapComponent(option);
      if (grid.outerBounds) {
        if (!hasLegend && !hasVisualMap) {
          warnings.push(language.t("warning.gridOuterBoundsUnnecessary", "grid.outerBounds should only be used when legend or visualMap components are configured, otherwise remove this configuration"));
        }
        // Check if outerBounds properties are numbers
        ["left", "right", "top", "bottom"].forEach(prop => {
          if (grid.outerBounds[prop] !== undefined && typeof grid.outerBounds[prop] !== "number") {
            warnings.push(`grid.outerBounds.${prop} ${language.t("warning.gridOuterBoundsMustBeNumber", "must be a number, strings or percentages are not allowed")}`);
          }
        });
        // Check if multiple directions are set
        const setBounds = ["left", "right", "top", "bottom"].filter(prop => grid.outerBounds[prop] !== undefined);
        if (setBounds.length > 1) {
          const message = language.t("warning.gridOuterBoundsMultipleDirections", "has {count} directions set ({directions}). Usually only one direction is needed to reserve space for legend/visualMap components. Please verify if all settings are necessary.", {
            count: setBounds.length,
            directions: setBounds.join(", "),
          });
          warnings.push(`grid.outerBounds ${message}`);
        }
      } else {
        // Skip outerBounds requirement for special chart types:
        // - Map charts: don't require outerBounds even if visualMap is present
        // - Pie charts: don't require outerBounds even if legend is present
        const isPieChart = ChartCard.hasPieComponent(option);
        const shouldSkipOuterBoundsCheck = isMapChart || (isPieChart && hasLegend && !hasVisualMap);
        if (!shouldSkipOuterBoundsCheck && (hasLegend || hasVisualMap)) {
          warnings.push(language.t("warning.gridOuterBoundsRequired", "grid.outerBounds must be configured to reserve space when legend or visualMap components are present"));
        }
      }
    };
    // Validate grid configuration
    if (option.grid) {
      validateGrid(option.grid);
    }
    // Validate top-level legend configuration
    if (option.legend) {
      validateLegend(option.legend);
    }
    // Validate series configuration
    if (option.series) {
      const series = Array.isArray(option.series) ? option.series : [option.series];
      series.forEach((item, index) => {
        if (item.legend) {
          validateLegend(item.legend, `series[${index}]`);
        }
      });
    }
    // Collect warnings to ErrorCollector
    if (warnings.length > 0 && window.ErrorCollector) {
      warnings.forEach(warningMessage => {
        window.ErrorCollector.collectWarning({
          type: "ECHARTS_CONFIG_WARNING",
          category: "COMPONENT_RENDER",
          message: warningMessage,
          details: {
            cardId: this.props.cardId,
            cardType: "ChartCard",
          },
          source: "ChartCard",
        });
      });
    }
    return warnings;
  }
  // Handle chart configuration options
  createChartOption(option) {
    return this.props.isMobile 
      ? ChartMobileTouchHandler.optimizeConfigForMobile(option)
      : option;
  }
  getDebouncedResize() {
    return window.UTILS.debounce(() => {
      if (this.chartInstanceRef.current && this.containerRef.current) {
        const containerRect = this.containerRef.current.getBoundingClientRect();
        if (containerRect.width > 0 && containerRect.height > 0) {
          this.chartInstanceRef.current.resize({
            width: containerRect.width,
            height: containerRect.height,
          });
        }
      }
    }, 100);
  }
  async initChart() {
    if (this.chartRef && this.chartRef.current && this.props.data) {
      try {
        // Reset error state
        this.setState({ error: null });
        // Validate ECharts option and collect warnings (non-blocking)
        this.validateEChartsOption(this.props.data);
        // Check if it's a valid ECharts configuration (data already validated in preprocessData)
        if (!ChartCard.isValidEChartsOption(this.props.data)) {
          const error = new Error(language.t("error.invalidEChartsConfig", "Invalid ECharts configuration data"));
          if (window.ErrorCollector) {
            window.ErrorCollector.collectInvalidEChartsConfigError("ChartCard");
          }
          throw error;
        }
        // Process configuration through createChartOption method
        const option = this.createChartOption(this.props.data);
        // Clean up old chart instance
        if (this.chartInstanceRef && this.chartInstanceRef.current) {
          this.chartInstanceRef.current.dispose();
        }
        // Get container dimensions
        const containerRect = this.chartRef.current.getBoundingClientRect();
        // Initialize chart with theme
        const { echartsThemeName } = this.props;
        const chart = echarts.init(this.chartRef.current, echartsThemeName, {
          width: containerRect.width === undefined ? "auto" : containerRect.width,
          height: containerRect.height === undefined ? "auto" : containerRect.height,
        });
        if (this.chartInstanceRef) {
          this.chartInstanceRef.current = chart;
        }
        // Listen for ECharts internal errors
        chart.on("error", chartError => {
          console.error("ECharts internal error:", chartError);
          if (window.ErrorCollector) {
            window.ErrorCollector.collectEChartsRenderError(chartError, "ChartCard");
          }
          this.setState({
            error: new Error(language.t("error.chartRenderError", "Error occurred during chart rendering")),
          });
        });
        // Set chart configuration
        chart.setOption(option, true);
        // Resize chart
        if (this.chartInstanceRef && this.chartInstanceRef.current) {
          this.chartInstanceRef.current.resize();
        }
      } catch (error) {
        console.error("ECharts rendering failed:", error);
        this.setState({ error });
      }
    }
  }
  destroy() {
    if (this.resizeObserverRef.current) {
      this.resizeObserverRef.current.disconnect();
    }
    if (this.chartInstanceRef.current) {
      this.chartInstanceRef.current.dispose();
      this.chartInstanceRef.current = null;
    }
  }
  // Helper method to handle chart initialization with error handling
  handleChartInit(context) {
    return this.initChart().catch(error => {
      console.error(`Chart initialization failed during ${context}:`, error);
      this.setState({ error });
    });
  }
  componentDidMount() {
    // Initialize chart (data already preprocessed in BaseCard)
    this.handleChartInit("component mount");
    // Set up window resize listener
    const debouncedResize = this.getDebouncedResize();
    window.addEventListener("resize", debouncedResize);
    if (this.containerRef.current && window.ResizeObserver) {
      this.resizeObserverRef.current = new ResizeObserver(debouncedResize);
      this.resizeObserverRef.current.observe(this.containerRef.current);
    }
    // Add mobile touch event listeners
    if (this.props.isMobile && this.chartRef.current) {
      this.mobileTouchHandler.addEventListeners(this.chartRef.current);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      // Reset error state
      this.setState({ error: null });
      // Re-initialize chart (data already preprocessed in BaseCard)
      this.handleChartInit("component update");
    }
    // Handle mobile state changes
    if (prevProps.isMobile !== this.props.isMobile && this.chartRef.current) {
      if (this.props.isMobile) {
        this.mobileTouchHandler.addEventListeners(this.chartRef.current);
      } else {
        this.mobileTouchHandler.removeEventListeners(this.chartRef.current);
      }
    }
  }
  componentWillUnmount() {
    const debouncedResize = this.getDebouncedResize();
    window.removeEventListener("resize", debouncedResize);
    // Remove mobile touch event listeners (only if they were added)
    if (this.props.isMobile && this.chartRef.current) {
      this.mobileTouchHandler.removeEventListeners(this.chartRef.current);
    }
    this.destroy();
  }
  render() {
    const { data, dashboardConfig } = this.props;
    // If there's an error, throw it for ErrorBoundary to catch
    if (this.state.error) {
      throw this.state.error;
    }
    if (!data) {
      return React.createElement(
        "div",
        {
          style: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: dashboardConfig.COLORS_TEXT_SECONDARY,
          },
        },
        null
      );
    }
    return React.createElement(
      "div",
      {
        ref: this.containerRef,
        style: {
          flex: 1,
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100%",
        },
      },
      React.createElement("div", {
        ref: this.chartRef,
        style: {
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        },
      })
    );
  }
}
window.ChartCard = ChartCard;

// Markdown card - Simplest marked implementation
class MarkdownCard extends React.Component {
  static async preprocessData(data) {
    return data;
  }
  static getMarkdownThemeConfig(dashboardConfig) {
    const baseFontSize = dashboardConfig?.BASE_FONT_SIZE || "14px";
    const textColor = dashboardConfig?.COLORS_TEXT_PRIMARY || "#333333";
    return {
      fontSize: baseFontSize,
      lineHeight: "1.6",
      color: textColor,
      fontFamily: dashboardConfig?.BODY_FONT_FAMILY || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h1: { fontSize: "1.8em", fontWeight: "bold", marginBottom: "0.5em" },
      h2: { fontSize: "1.5em", fontWeight: "bold", marginBottom: "0.5em" },
      h3: { fontSize: "1.3em", fontWeight: "bold", marginBottom: "0.4em" },
      h4: { fontSize: "1.1em", fontWeight: "bold", marginBottom: "0.4em" },
      p: { marginBottom: "0.8em" },
      code: {
        backgroundColor: "#f5f5f5",
        padding: "0.2em 0.4em",
        borderRadius: "3px",
        fontSize: "0.9em",
      },
      pre: {
        backgroundColor: "#f5f5f5",
        padding: "0.8em",
        borderRadius: "4px",
        overflow: "auto",
      },
      ul: { paddingLeft: "1.5em", marginBottom: "0.8em" },
      ol: { paddingLeft: "1.5em", marginBottom: "0.8em" },
      a: {
        color: dashboardConfig?.COLORS_PRIMARY || "#0969da",
        textDecoration: "none",
      },
      table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "0.8em",
      },
      th: { padding: "0.5em", border: "1px solid #ddd", fontWeight: "bold" },
      td: { padding: "0.5em", border: "1px solid #ddd" },
    };
  }
  generateThemeCSS() {
    const config = MarkdownCard.getMarkdownThemeConfig(this.props.dashboardConfig);
    const cssRules = [];
    cssRules.push(`
      .markdown-content {
        font-size: ${config.fontSize};
        line-height: ${config.lineHeight};
        color: ${config.color};
        font-family: ${config.fontFamily};
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
      }
    `);
    Object.keys(config).forEach(selector => {
      if (typeof config[selector] === "object" && config[selector] !== null) {
        const styles = Object.entries(config[selector])
          .map(([prop, value]) => {
            // Convert camelCase to kebab-case
            const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
            return `${cssProp}: ${value}`;
          })
          .join("; ");
        cssRules.push(`.markdown-content ${selector} { ${styles}; }`);
      }
    });
    return cssRules.join("\n");
  }
  render() {
    let content = "";
    if (typeof this.props.data === "string") {
      content = this.props.data;
    } else if (this.props.data && this.props.data.content) {
      content = this.props.data.content;
    }
    if (!content.trim()) {
      return React.createElement(
        "div",
        {
          style: {
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#999",
          },
        },
        language.t("common.noData", "No data")
      );
    }
    if (!window.marked) {
      return React.createElement(
        "div",
        {
          style: {
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ff4d4f",
          },
        },
        language.t("error.markedLibraryNotLoaded", "marked library not loaded")
      );
    }
    let html = "";
    try {
      html = window.marked.parse(content);
    } catch (error) {
      return React.createElement(
        "div",
        {
          style: {
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ff4d4f",
          },
        },
        `${language.t("error.renderError", "Render error")}: ${error.message}`
      );
    }
    const themeCSS = this.generateThemeCSS();
    return React.createElement(
      "div",
      {
        style: {
          height: "100%",
          overflow: "hidden",
        },
      },
      [
        React.createElement("style", {
          key: "markdown-theme",
          dangerouslySetInnerHTML: { __html: themeCSS },
        }),
        React.createElement("div", {
          key: "markdown-content",
          className: "markdown-content",
          dangerouslySetInnerHTML: { __html: html },
        }),
      ]
    );
  }
}
window.MarkdownCard = MarkdownCard;

// Empty state component - Used to display no data or empty list state
class Empty extends React.Component {
  constructor(props) {
    super(props);
  }
  getEmptyThemeConfig() {
    const config = this.props.dashboardConfig;
    return {
      ICON_COLOR: config?.COLORS_BORDER || "#e6e7ea",
    };
  }
  render() {
    const themeConfig = this.getEmptyThemeConfig();
    const { iconColor = themeConfig.ICON_COLOR, style = {}, className = "" } = this.props;
    const mergedStyle = {
      ...style,
    };
    return React.createElement(
      "svg",
      {
        width: "60",
        height: "55",
        viewBox: "0 0 60 55",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
        style: mergedStyle,
      },
      React.createElement("path", {
        transform: "translate(-38, -3.5)",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M45.5548 9.73505C45.0215 10.7793 44.5265 12.2984 44.1941 14.2555C43.7452 16.8992 43.6487 20.016 43.9809 23.1113C44.314 26.2155 45.0643 29.1689 46.2172 31.5408C46.4758 32.0727 46.7491 32.5648 47.0361 33.0171C47.0369 32.7418 47.0392 32.4647 47.0414 32.1872C47.0422 32.0975 47.0429 32.0078 47.0436 31.9181C47.0466 31.524 47.0492 31.1743 47.0492 30.8668C47.0492 29.5207 47.1946 27.2203 48.6709 25.2427C50.2729 23.0968 52.9149 21.9846 56.484 21.9846H60.8024C58.9127 19.6098 55.883 16.2846 52.6595 13.6575C50.9664 12.2777 49.308 11.1634 47.8053 10.465C46.9037 10.046 46.1575 9.82273 45.5548 9.73505ZM75.1977 21.9846H79.516C83.0851 21.9846 85.7271 23.0968 87.3291 25.2427C88.8054 27.2203 88.9508 29.5207 88.9508 30.8668C88.9508 31.1743 88.9534 31.524 88.9564 31.9181C88.9571 32.0078 88.9578 32.0975 88.9586 32.1872C88.9608 32.4646 88.9631 32.7417 88.9639 33.0171C89.2509 32.5648 89.5242 32.0727 89.7828 31.5408C90.9357 29.1689 91.686 26.2155 92.0191 23.1113C92.3513 20.016 92.2548 16.8992 91.8059 14.2555C91.4735 12.2984 90.9785 10.7793 90.4452 9.73505C89.8425 9.82273 89.0963 10.046 88.1947 10.465C86.692 11.1634 85.0336 12.2777 83.3405 13.6575C80.117 16.2846 77.0873 19.6098 75.1977 21.9846ZM84.4493 41.8186C84.1059 41.9474 83.7546 42.0595 83.4042 42.1572C82.032 42.5396 80.4365 42.7662 78.868 42.8229C77.3067 42.8794 75.6339 42.7728 74.1307 42.4052C72.735 42.0639 70.9486 41.3682 69.8391 39.8227C69.3094 39.085 68.8207 38.7647 68.5298 38.6273C68.4022 38.567 68.3053 38.5383 68.2486 38.5254L68 38.5595L67.7514 38.5254C67.6947 38.5383 67.5978 38.567 67.4703 38.6273C67.1793 38.7647 66.6906 39.085 66.1609 39.8227C65.0514 41.3682 63.265 42.0639 61.8693 42.4052C60.3661 42.7728 58.6933 42.8794 57.132 42.8229C55.5635 42.7662 53.968 42.5396 52.5958 42.1572C52.2454 42.0595 51.8941 41.9474 51.5507 41.8186C51.2425 43.085 50.9637 44.0406 50.7159 44.7536L50.7154 44.755C53.3463 47.7974 59.3235 52.3409 67.9223 52.1098L68 52.1077L68.0777 52.1098C76.6765 52.3409 82.6537 47.7974 85.2846 44.755L85.2841 44.7536C85.0363 44.0406 84.7575 43.085 84.4493 41.8186ZM45.9681 40.2995C43.8018 38.7097 42.1873 36.4798 41.0164 34.071C39.4976 30.9463 38.6147 27.306 38.2308 23.7289C37.8459 20.1428 37.9486 16.4905 38.4927 13.2865C39.022 10.1693 40.0287 7.12086 41.7277 5.05064L42.3995 4.23216L43.4406 4.04101C45.8073 3.60652 48.1848 4.26189 50.2418 5.21788C52.3373 6.19178 54.4109 7.62251 56.312 9.17184C59.374 11.6673 62.2175 14.6597 64.2811 17.1061C64.6538 17.0171 65.0058 16.9532 65.3161 16.9054C66.3394 16.748 67.3263 16.7086 68 16.7234C68.6737 16.7086 69.6606 16.748 70.6839 16.9054C70.9942 16.9532 71.3462 17.0171 71.7189 17.1061C73.7825 14.6597 76.626 11.6673 79.688 9.17184C81.5891 7.62251 83.6627 6.19178 85.7582 5.21788C87.8152 4.26189 90.1927 3.60652 92.5594 4.04101L93.6005 4.23216L94.2723 5.05064C95.9713 7.12086 96.978 10.1693 97.5073 13.2865C98.0514 16.4905 98.1541 20.1428 97.7692 23.7289C97.3853 27.306 96.5024 30.9463 94.9836 34.071C93.8127 36.4798 92.1982 38.7097 90.0319 40.2995C90.2561 41.2327 90.4502 41.9303 90.6104 42.4403L93.567 42.8746L91.0879 46.6634C88.4419 50.7071 80.3406 58.1948 68 57.8953C55.6594 58.1948 47.5581 50.7071 44.9121 46.6634L42.433 42.8746L45.3896 42.4403C45.5498 41.9303 45.7439 41.2327 45.9681 40.2995ZM53.3045 28.7047C52.9924 29.1228 52.8324 29.8171 52.8324 30.8668C52.8324 31.1986 52.8295 31.5693 52.8266 31.9546L52.8265 31.9623C52.8144 33.5548 52.8076 34.5174 52.904 35.2723C52.9694 35.7846 53.0668 36.0467 53.1722 36.2203C53.1861 36.2279 53.2019 36.2362 53.2198 36.2453C53.4082 36.3414 53.7145 36.4629 54.1479 36.5838C55.0141 36.8252 56.1503 36.9979 57.341 37.041C58.5387 37.0844 59.6521 36.9914 60.4963 36.7849C61.2613 36.5979 61.4902 36.3979 61.4954 36.4036C63.4862 33.6582 66.0906 32.6429 68 32.7373C69.9094 32.6429 72.5138 33.6583 74.5045 36.4037C74.5097 36.398 74.7387 36.5979 75.5037 36.7849C76.3479 36.9914 77.4613 37.0844 78.659 37.041C79.8497 36.9979 80.9859 36.8252 81.8521 36.5838C82.2855 36.4629 82.5918 36.3414 82.7802 36.2453C82.7981 36.2362 82.8139 36.2279 82.8278 36.2203C82.9332 36.0467 83.0306 35.7846 83.096 35.2723C83.1924 34.5174 83.1856 33.5548 83.1735 31.9623L83.1734 31.954C83.1705 31.5689 83.1676 31.1984 83.1676 30.8668C83.1676 29.8171 83.0076 29.1228 82.6955 28.7047C82.509 28.4548 81.8795 27.7702 79.516 27.7702H56.484C54.1205 27.7702 53.491 28.4548 53.3045 28.7047Z",
        fill: iconColor,
      })
    );
  }
}
window.Empty = Empty;

// Card component - Main card component providing common functionality and styles
class BaseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dataLoading: true,
      childLoading: false,
      error: null,
      renderStatus: "loading",
    };
    this.hasNotifiedRenderComplete = false;
  }
  notifyRenderStatusChange(status, error = null) {
    this.setState({ renderStatus: status });
    if (this.hasNotifiedRenderComplete && (status === "success" || status === "error")) {
      return;
    }
    if (status === "success" || status === "error") {
      this.hasNotifiedRenderComplete = true;
    }
    if (this.props.onRenderStatusChange) {
      this.props.onRenderStatusChange({
        cardId: this.cardId,
        status: status,
        error: error,
        timestamp: Date.now(),
      });
    }
  }
  getBaseCardThemeConfig() {
    const config = this.props.dashboardConfig;
    const fontSize = config.BASE_FONT_SIZE;
    const titleFontSize = config.CARD_TITLE_FONT_SIZE;
    return {
      FONT_SIZE: fontSize,
      TITLE_FONT_SIZE: titleFontSize,
      LOADING_FONT_SIZE: fontSize,
      ERROR_MESSAGE_FONT_SIZE: fontSize,
      ERROR_DETAIL_FONT_SIZE: fontSize,
      LOADING_ICON_SIZE: "20px",
      ERROR_ICON_SIZE: "24px",
      NO_DATA_ICON_SIZE: "24px",
      DRAG_HANDLE_WIDTH: "32px",
      DRAG_HANDLE_HEIGHT: "4px",
      DRAG_HANDLE_ICON_SIZE: "14px",
      DRAG_DOT_SIZE: "1.2",
      DELETE_BUTTON_SIZE: "18px",
      DELETE_BUTTON_ICON_SIZE: "12px",
      TITLE_MARGIN_BOTTOM: config.CARD_GAP,
      TITLE_PADDING_RIGHT: config.CARD_GAP,
      LOADING_ICON_MARGIN: config.CARD_GAP,
      ERROR_ICON_MARGIN: config.CARD_GAP,
      ERROR_MESSAGE_MARGIN: config.CARD_GAP,
      NO_DATA_ICON_MARGIN: config.CARD_GAP,
      NO_DATA_MESSAGE_MARGIN: config.CARD_GAP,
      STATE_PADDING: config.CARD_GAP,
      DRAG_HANDLE_TOP: `-${config.CARD_GAP}`, // Negative card padding value
      DRAG_HANDLE_LEFT: "50%",
      DRAG_HANDLE_MARGIN_LEFT: "-16px", // Negative half width for centering
      DRAG_HANDLE_BORDER_RADIUS: config.CARD_BORDER_RADIUS,
      DELETE_BUTTON_TOP: "0px",
      DELETE_BUTTON_RIGHT: "0px",
      DELETE_BUTTON_BORDER_RADIUS: config.CARD_BORDER_RADIUS,
      TEXT_PRIMARY: config.COLORS_TEXT_PRIMARY,
      TEXT_SECONDARY: config.COLORS_TEXT_SECONDARY,
      ERROR: config.COLORS_ERROR,
      BORDER: config.COLORS_BORDER,
      DRAG_HOVER_OPACITY: 0.8,
      DELETE_HOVER_OPACITY: 0.8,
      NO_DATA_OPACITY: 0.8,
      ERROR_DETAIL_OPACITY: 0.7,
      LOADING_TEXT_OPACITY: 0.7,
    };
  }
  // Load data after component mount
  async componentDidMount() {
    await this.loadCardData();
    // Add global mouse release event listener to ensure drag state is properly cleared
    this.handleGlobalMouseUp = () => {
      const draggingItems = document.querySelectorAll(".react-grid-item.dragging-immediate");
      draggingItems.forEach(item => {
        item.classList.remove("dragging-immediate");
      });
    };
    document.addEventListener("mouseup", this.handleGlobalMouseUp);
    document.addEventListener("mouseleave", this.handleGlobalMouseUp);
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.getCardData !== this.props.getCardData) {
      await this.loadCardData();
    }
  }
  componentWillUnmount() {
    if (this.handleGlobalMouseUp) {
      document.removeEventListener("mouseup", this.handleGlobalMouseUp);
      document.removeEventListener("mouseleave", this.handleGlobalMouseUp);
    }
  }
  async loadCardData() {
    const { getCardData, type } = this.props;
    // Notify loading start
    this.notifyRenderStatusChange("loading");
    // If no getCardData function is provided, set to no data state
    if (!getCardData || typeof getCardData !== "function") {
      this.setState({
        data: null,
        dataLoading: false,
        childLoading: false,
        error: null,
      });
      // Notify render success (no data is also considered success state)
      this.notifyRenderStatusChange("success");
      return;
    }
    try {
      // Set data loading state
      this.setState({ dataLoading: true, error: null });
      // Asynchronously get data, pass in csvManager instance
      let rawData;
      try {
        rawData = await getCardData(window.CSVManager);
      } catch (dataError) {
        console.error(`[BaseCard] Raw data fetch failed (${this.cardId}):`, dataError);
        const error = new Error(`Data fetch failed: ${dataError.message}`);
        if (window.ErrorCollector) {
          window.ErrorCollector.collectDataFetchError(this.cardId, dataError, "BaseCard");
        }
        throw error;
      }
      // Data fetch completed, start child component preprocessing
      this.setState({ dataLoading: false, childLoading: true });
      // Preprocess according to card type
      let processedData = rawData;
      // Get corresponding component class and its static preprocessing method
      const componentClass = this.getComponentClass(type);
      if (componentClass && typeof componentClass.preprocessData === "function") {
        try {
          processedData = await componentClass.preprocessData(rawData);
          // Check preprocessing result, log warning if there are error flags
          if (processedData._preprocessed === false && processedData._preprocessError) {
            console.warn(`[BaseCard] ${type} type data preprocessing has warning (${this.cardId}): ${processedData._preprocessError}`);
          }
        } catch (preprocessError) {
          console.error(`[BaseCard] ${type} type data preprocessing failed (${this.cardId}):`, preprocessError);
          // Decide processing strategy based on error severity
          if (preprocessError.code && preprocessError.code.includes("INVALID")) {
            // Serious error (data format error), throw to user
            const error = new Error(`Data format error: ${preprocessError.message}`);
            if (window.ErrorCollector) {
              window.ErrorCollector.collectDataFormatError(this.cardId, preprocessError, "BaseCard");
            }
            throw error;
          } else {
            // Non-serious error (such as network error), continue with original data
            console.warn(`[BaseCard] Preprocessing failed, continue rendering with original data (${this.cardId})`);
            processedData = {
              ...rawData,
              _preprocessed: false,
              _preprocessError: preprocessError.message,
              _preprocessedAt: Date.now(),
            };
          }
        }
      }
      // All processing completed
      this.setState({
        data: processedData,
        dataLoading: false,
        childLoading: false,
        error: null,
      });
      // Notify render success
      this.notifyRenderStatusChange("success");
    } catch (error) {
      console.error(`[BaseCard] Card data loading failed (${this.cardId}):`, error);
      // Set error state
      this.setState({
        data: null,
        dataLoading: false,
        childLoading: false,
        error: error,
      });
      // Notify render failure
      this.notifyRenderStatusChange("error", error);
    }
  }
  // Get component class
  getComponentClass(type) {
    const componentClasses = {
      metric: window.MetricCard,
      kpi: window.KPICard,
      table: window.TableCard,
      text: window.TextCard,
      image: window.ImageCard,
      echarts: window.ChartCard,
    };
    return componentClasses[type];
  }
  // Calculate overall loading state
  get isLoading() {
    return this.state.dataLoading || this.state.childLoading;
  }
  // Get card ID
  get cardId() {
    return this.props.id || `card-${Date.now()}`;
  }
  // Get card title
  get cardTitle() {
    return this.props.title || "";
  }
  // Get card title alignment
  get cardTitleAlign() {
    return this.props.titleAlign || "left";
  }
  // Get card type
  get cardType() {
    return this.props.type || "base";
  }
  // Get card style
  get cardStyle() {
    return this.props.style || {};
  }
  // Get card class name
  get cardClassName() {
    return this.props.className || "";
  }
  // Get card container style
  getContainerStyle() {
    return {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      ...this.cardStyle,
    };
  }
  // Render unified loading state (includes data loading and child component loading)
  renderLoadingState() {
    const themeConfig = this.getBaseCardThemeConfig();
    const { dataLoading, childLoading } = this.state;
    // Unified loading state for both data loading and child loading
    const icon = React.createElement("i", {
      className: "ti ti-loader",
      style: { fontSize: "24px", color: "#666" },
    });
    const loadingText = language.t("common.loading");
    return React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: themeConfig.TEXT_SECONDARY,
          fontSize: themeConfig.LOADING_FONT_SIZE,
        },
      },
      React.createElement(
        "div",
        {
          key: "loading-icon",
          style: {
            fontSize: themeConfig.LOADING_ICON_SIZE,
            marginBottom: themeConfig.LOADING_ICON_MARGIN,
          },
        },
        icon
      ),
      React.createElement(
        "div",
        {
          key: "loading-text",
          style: {
            color: themeConfig.TEXT_SECONDARY,
            fontSize: themeConfig.LOADING_FONT_SIZE,
            opacity: themeConfig.LOADING_TEXT_OPACITY,
          },
        },
        loadingText
      )
    );
  }
  // Render error state
  renderErrorState() {
    const themeConfig = this.getBaseCardThemeConfig();
    return React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: themeConfig.STATE_PADDING,
          textAlign: "center",
        },
      },
      [
        React.createElement(
          "div",
          {
            key: "error-icon",
            style: {
              fontSize: themeConfig.ERROR_ICON_SIZE,
              marginBottom: themeConfig.ERROR_ICON_MARGIN,
              opacity: themeConfig.NO_DATA_OPACITY,
            },
          },
          React.createElement("i", {
            className: "ti ti-alert-triangle",
            style: { fontSize: "24px", color: "#ff6b6b" },
          })
        ),
        React.createElement(
          "div",
          {
            key: "error-message",
            style: {
              color: themeConfig.ERROR,
              fontSize: themeConfig.ERROR_MESSAGE_FONT_SIZE,
              fontWeight: "500",
              marginBottom: themeConfig.ERROR_MESSAGE_MARGIN,
            },
          },
          language.t("error.title")
        ),
        React.createElement(
          "div",
          {
            key: "error-detail",
            style: {
              color: themeConfig.TEXT_SECONDARY,
              fontSize: themeConfig.ERROR_DETAIL_FONT_SIZE,
              opacity: themeConfig.ERROR_DETAIL_OPACITY,
            },
          },
          this.state.error?.message || language.t("common.error")
        ),
      ]
    );
  }
  // Render no data state
  renderNoDataState() {
    const themeConfig = this.getBaseCardThemeConfig();
    return React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: themeConfig.STATE_PADDING,
          textAlign: "center",
          color: themeConfig.TEXT_SECONDARY,
        },
      },
      [
        React.createElement(
          "div",
          {
            key: "no-data-icon",
            style: {
              fontSize: themeConfig.NO_DATA_ICON_SIZE,
              marginBottom: themeConfig.NO_DATA_ICON_MARGIN,
              opacity: themeConfig.NO_DATA_OPACITY,
            },
          },
          React.createElement("i", {
            className: "ti ti-inbox",
            style: { fontSize: "24px", color: "#666" },
          })
        ),
        React.createElement(
          "div",
          {
            key: "no-data-message",
            style: {
              color: themeConfig.TEXT_SECONDARY,
              fontSize: themeConfig.LOADING_FONT_SIZE,
              fontWeight: "500",
              marginBottom: themeConfig.NO_DATA_MESSAGE_MARGIN,
            },
          },
          language.t("common.noData")
        ),
      ]
    );
  }
  // Create child card component based on type
  createChildCard() {
    const { type, dashboardConfig, getCardData } = this.props;
    const { data, dataLoading, childLoading, error } = this.state;
    // If loading (data loading or child component loading), show loading state
    if (dataLoading || childLoading) {
      return this.renderLoadingState();
    }
    // If loading error, show error state
    if (error) {
      return this.renderErrorState();
    }
    // If no getCardData function is provided, show no data state
    if (!getCardData || typeof getCardData !== "function") {
      return this.renderNoDataState();
    }
    // If data loading succeeded but data is empty, show no data state
    if (!data) {
      return this.renderNoDataState();
    }
    const cardTypes = {
      // Base cards
      base: () => this.renderDefaultContent(),
      metric: MetricCard,
      kpi: KPICard,
      table: TableCard,
      text: TextCard,
      image: ImageCard,
      markdown: MarkdownCard,
      // Chart cards - unified use of echarts type
      echarts: ChartCard,
    };
    const CardComponent = cardTypes[type];
    let childElement;
    if (typeof CardComponent === "function" && CardComponent !== this.renderDefaultContent) {
      // Render child card component, pass in preprocessed data
      childElement = React.createElement(CardComponent, {
        data,
        dashboardConfig,
        cardId: this.cardId,
        isMobile: this.props.isMobile || false,
        echartsThemeName: this.props.echartsThemeName,
      });
    } else if (CardComponent === this.renderDefaultContent) {
      // Render default content
      childElement = CardComponent();
    } else {
      // Unknown type, render default content
      childElement = this.renderDefaultContent();
    }
    // Wrap child card component with ErrorBoundary
    return React.createElement(
      window.ErrorBoundary,
      {
        cardType: type,
        cardId: this.cardId,
        dashboardConfig: dashboardConfig,
      },
      childElement
    );
  }
  // Render default card content
  renderDefaultContent() {
    const themeConfig = this.getBaseCardThemeConfig();
    return React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: themeConfig.TEXT_SECONDARY,
          fontSize: themeConfig.FONT_SIZE,
        },
      },
      null
    );
  }
  // Render drag handle
  renderDragHandle() {
    const isDraggable = this.props.editorConfig?.DRAGGABLE || false;
    if (!isDraggable) return null;
    const themeConfig = this.getBaseCardThemeConfig();
    return React.createElement(
      "div",
      {
        key: "drag-handle",
        className: "drag-handle",
        style: {
          position: "absolute",
          top: themeConfig.DRAG_HANDLE_TOP,
          left: themeConfig.DRAG_HANDLE_LEFT,
          marginLeft: themeConfig.DRAG_HANDLE_MARGIN_LEFT,
          width: themeConfig.DRAG_HANDLE_WIDTH,
          height: "12px", // Reduce height
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0 0 2px 2px", // Only bottom rounded corners
          backgroundColor: "rgba(128, 128, 128, 0.3)", // Gray semi-transparent background
          // Remove inline opacity and visibility styles, let CSS control show/hide
          transition: "all 0.2s ease",
          zIndex: 10,
        },
        onMouseDown: e => {
          // Immediately add dragging style class to parent element
          const gridItem = e.currentTarget.closest(".react-grid-item");
          if (gridItem) {
            gridItem.classList.add("dragging-immediate");
          }
        },
        onMouseUp: e => {
          // Remove immediate drag style
          const gridItem = e.currentTarget.closest(".react-grid-item");
          if (gridItem) {
            gridItem.classList.remove("dragging-immediate");
          }
        },
      },
      React.createElement(
        "svg",
        {
          width: "16",
          height: "10",
          viewBox: "0 0 16 10",
          fill: "none",
          style: {
            pointerEvents: "none",
            display: "block",
            margin: "auto",
          },
        },
        [
          React.createElement("rect", {
            key: "line1",
            x: "2",
            y: "2",
            width: "12",
            height: "1.2",
            fill: themeConfig.TEXT_SECONDARY,
            rx: "0.6",
          }),
          React.createElement("rect", {
            key: "line2",
            x: "2",
            y: "4.4",
            width: "12",
            height: "1.2",
            fill: themeConfig.TEXT_SECONDARY,
            rx: "0.6",
          }),
          React.createElement("rect", {
            key: "line3",
            x: "2",
            y: "6.8",
            width: "12",
            height: "1.2",
            fill: themeConfig.TEXT_SECONDARY,
            rx: "0.6",
          }),
        ]
      )
    );
  }
  // Render expand button (for modal)
  renderExpandButton() {
    const isExpandable = this.props.editorConfig?.EXPANDABLE || false;
    if (!isExpandable) return null;
    const themeConfig = this.getBaseCardThemeConfig();
    const isDeletable = this.props.editorConfig?.DELETABLE || false;
    // Button positioning constants
    const BUTTON_SIZE = parseInt(themeConfig.DELETE_BUTTON_SIZE); // 18px
    const BUTTON_GAP = 3; // Gap between expand and delete buttons
    const BUTTON_TOTAL_OFFSET = BUTTON_SIZE + BUTTON_GAP; // 18 + 3 = 21px
    // Get positioning based on title alignment (same logic as delete button)
    const getExpandButtonPosition = () => {
      const title = this.cardTitle;
      const titleAlign = this.cardTitleAlign;
      // Calculate right offset based on delete button presence
      const calculateRightOffset = (baseRight) => {
        if (isDeletable) {
          // Position to the left of delete button with gap
          const baseRightValue = parseInt(baseRight) || 0;
          return `${baseRightValue + BUTTON_TOTAL_OFFSET}px`;
        } else {
          // Use the same position as delete button would have
          return baseRight;
        }
      };
      if (!title || titleAlign === "left" || titleAlign === "center") {
        // For left and center alignment, position at top-right corner of card
        return {
          position: "absolute",
          top: "0px",
          right: calculateRightOffset("0px"),
        };
      } else {
        // For right alignment, use positioning relative to title area
        return {
          position: "absolute",
          top: themeConfig.DELETE_BUTTON_TOP,
          right: calculateRightOffset(themeConfig.DELETE_BUTTON_RIGHT),
        };
      }
    };
    const positionStyle = getExpandButtonPosition();
    return React.createElement(
      "div",
      {
        key: "expand-button",
        className: "expand-button",
        style: {
          ...positionStyle,
          width: themeConfig.DELETE_BUTTON_SIZE,
          height: themeConfig.DELETE_BUTTON_SIZE,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: themeConfig.DELETE_BUTTON_BORDER_RADIUS,
          transition: "all 0.2s ease",
          zIndex: 10,
        },
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.showInModal();
        },
      },
      React.createElement("i", {
        className: "ti ti-maximize",
        style: {
          fontSize: themeConfig.DELETE_BUTTON_ICON_SIZE,
          color: themeConfig.TEXT_SECONDARY,
          pointerEvents: "none",
        },
      })
    );
  }
  // Show card in modal
  showInModal() {
    if (window.CardModal) {
      const title = this.cardTitle;
      try {
        window.CardModal.open(title,  this.createChildCard());
      } catch (error) {
        console.error("Error opening modal:", error);
      }
    } else {
      console.error("CardModal not found on window object");
    }
  }
  // Render delete button
  renderDeleteButton() {
    const isDeletable = this.props.editorConfig?.DELETABLE || false;
    if (!isDeletable) return null;
    const themeConfig = this.getBaseCardThemeConfig();
    // Get positioning based on title alignment
    const getDeleteButtonPosition = () => {
      const title = this.cardTitle;
      const titleAlign = this.cardTitleAlign;
      if (!title || titleAlign === "left" || titleAlign === "center") {
        // For left and center alignment, position at top-right corner of card
        return {
          position: "absolute",
          top: "0px",
          right: "0px",
        };
      } else {
        // For right alignment, use current positioning (relative to title area)
        // This allows the delete button to be positioned relative to the title
        return {
          position: "absolute",
          top: themeConfig.DELETE_BUTTON_TOP,
          right: themeConfig.DELETE_BUTTON_RIGHT,
        };
      }
    };
    const positionStyle = getDeleteButtonPosition();
    return React.createElement(
      "div",
      {
        key: "delete-button",
        className: "delete-button",
        style: {
          ...positionStyle,
          width: themeConfig.DELETE_BUTTON_SIZE,
          height: themeConfig.DELETE_BUTTON_SIZE,
          lineHeight: themeConfig.DELETE_BUTTON_SIZE,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: themeConfig.DELETE_BUTTON_BORDER_RADIUS,
          transition: "all 0.2s ease",
          zIndex: 10,
        },
        onClick: e => {
          e.preventDefault();
          e.stopPropagation();
          if (this.props.onDeleteCard) {
            this.props.onDeleteCard(this.cardId);
          }
        },
      },
      React.createElement("i", {
        className: "ti ti-x",
        style: {
          fontSize: themeConfig.DELETE_BUTTON_ICON_SIZE,
          color: themeConfig.TEXT_SECONDARY,
          pointerEvents: "none",
          transform: "translateX(0.45px) translateY(0.6px)",
        },
      })
    );
  }
  // Render card title
  renderTitle() {
    if (!this.cardTitle) return null;
    const themeConfig = this.getBaseCardThemeConfig();
    const isDraggable = this.props.editorConfig?.DRAGGABLE || false;
    const isDeletable = this.props.editorConfig?.DELETABLE || false;
    return React.createElement(
      "div",
      {
        key: "card-title",
        className: "card-title",
        style: {
          color: themeConfig.TEXT_PRIMARY,
          fontSize: themeConfig.TITLE_FONT_SIZE,
          fontWeight: "500",
          marginBottom: themeConfig.TITLE_MARGIN_BOTTOM,
          textAlign: this.cardTitleAlign,
          flexShrink: 0,
          paddingRight: isDeletable ? themeConfig.TITLE_PADDING_RIGHT : undefined, // Reserve space for delete button on the right
          position: "relative",
        },
      },
      this.cardTitle
    );
  }
  // Render complete card
  render() {
    const containerStyle = {
      ...this.getContainerStyle(),
      position: "relative", // Ensure drag handle can be absolutely positioned
    };
    return React.createElement(
      "div",
      {
        className: `base-card ${this.cardClassName}`,
        style: containerStyle,
        "data-card-id": this.cardId,
        "data-card-type": this.cardType,
      },
      React.createElement(React.Fragment, null, this.renderDragHandle(), this.renderExpandButton(), this.renderDeleteButton(), this.renderTitle(), this.createChildCard())
    );
  }
}
window.BaseCard = BaseCard;

// Error collector - Unified collection and management of various errors in the dashboard
class ErrorCollector {
  constructor() {
    this.errors = [];
    this.errorCounts = new Map();
    this.warnings = [];
    this.warningCounts = new Map();
    this.listeners = [];
    this.initGlobalErrorHandlers();
  }
  initGlobalErrorHandlers() {
    window.addEventListener("error", event => {
      this.collectError({
        type: "JAVASCRIPT_ERROR",
        category: "RUNTIME",
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        source: "window.error",
      });
    });
    window.addEventListener("unhandledrejection", event => {
      this.collectError({
        type: "UNHANDLED_PROMISE_REJECTION",
        category: "RUNTIME",
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        source: "unhandledrejection",
      });
    });
    document.addEventListener("ComponentError", event => {
      this.collectError({
        type: "REACT_COMPONENT_ERROR",
        category: "COMPONENT_RENDER",
        message: event.detail.error,
        stack: event.detail.stack,
        componentStack: event.detail.componentStack,
        cardType: event.detail.cardType,
        cardId: event.detail.cardId,
        source: "ErrorBoundary",
      });
    });
  }
  collectError(errorInfo) {
    const error = {
      id: this.generateErrorId(),
      timestamp: Date.now(),
      type: errorInfo.type || "UNKNOWN_ERROR",
      category: errorInfo.category || "UNKNOWN",
      message: errorInfo.message || "Unknown error",
      details: errorInfo.details || {},
      stack: errorInfo.stack,
      componentStack: errorInfo.componentStack,
      source: errorInfo.source || "manual",
      severity: "ERROR",
      context: this.captureContext(errorInfo),
      ...errorInfo,
    };
    this.errors.push(error);
    const count = this.errorCounts.get(error.type) || 0;
    this.errorCounts.set(error.type, count + 1);
    this.notifyListeners(error);
    this.logError(error);
    return error.id;
  }
  collectWarning(warningInfo) {
    const warning = {
      id: this.generateWarningId(),
      timestamp: Date.now(),
      type: warningInfo.type || "UNKNOWN_WARNING",
      category: warningInfo.category || "UNKNOWN",
      message: warningInfo.message || "Unknown warning",
      details: warningInfo.details || {},
      source: warningInfo.source || "manual",
      severity: "WARNING",
      context: this.captureContext(warningInfo),
      ...warningInfo,
    };
    this.warnings.push(warning);
    const count = this.warningCounts.get(warning.type) || 0;
    this.warningCounts.set(warning.type, count + 1);
    this.notifyListeners(warning);
    this.logWarning(warning);
    return warning.id;
  }
  collectDataLoadError(errorInfo) {
    return this.collectError({
      ...errorInfo,
      category: "DATA_LOAD",
      type: errorInfo.type || "DATA_LOAD_ERROR",
    });
  }
  collectCSVLoadError(fileName, httpStatus, statusText, source = "CSVManager") {
    return this.collectError({
      type: "CSV_LOAD_FAILED",
      category: "DATA_LOAD",
      message: `HTTP ${httpStatus}: ${statusText}`,
      details: {
        fileName,
        httpStatus,
        statusText,
      },
      source,
    });
  }
  collectInvalidFileNameError(fileName, source = "CSVManager") {
    return this.collectError({
      type: "INVALID_FILE_NAME",
      category: "DATA_LOAD",
      message: "Invalid file name",
      details: {
        fileName,
        fileNameType: typeof fileName,
      },
      source,
    });
  }
  collectDataSourceNotFoundError(fileName, source = "CSVManager") {
    return this.collectError({
      type: "DATA_SOURCE_NOT_FOUND",
      category: "DATA_LOAD",
      message: `File configuration not found in magicDashboard.dataSources: ${fileName}`,
      details: {
        fileName,
        availableConfigs: window.magicDashboard?.dataSources?.map(c => c.name) || [],
      },
      source,
    });
  }
  collectCSVParseError(fileName, parseError, source = "CSVManager") {
    return this.collectError({
      type: "CSV_PARSE_FAILED",
      category: "DATA_LOAD",
      message: `CSV parsing failed: ${parseError.message || parseError}`,
      details: {
        fileName,
        parseError: parseError.message || String(parseError),
      },
      source,
    });
  }
  collectDataFetchError(cardId, dataError, source = "BaseCard") {
    return this.collectError({
      type: "DATA_FETCH_FAILED",
      category: "DATA_LOAD",
      message: `Data fetch failed: ${dataError.message}`,
      details: {
        cardId,
        originalError: dataError.message,
      },
      source,
    });
  }
  collectDataFormatError(cardId, preprocessError, source = "BaseCard") {
    return this.collectError({
      type: "DATA_FORMAT_ERROR",
      category: "DATA_LOAD",
      message: `Data format error: ${preprocessError.message}`,
      details: {
        cardId,
        errorCode: preprocessError.code,
        originalError: preprocessError.message,
      },
      source,
    });
  }
  collectInvalidEChartsConfigError(source = "ChartCard") {
    return this.collectError({
      type: "INVALID_ECHARTS_CONFIG",
      category: "COMPONENT_RENDER",
      message: "Invalid ECharts configuration data",
      source,
    });
  }
  collectEChartsRenderError(chartError, source = "ChartCard") {
    return this.collectError({
      type: "ECHARTS_RENDER_ERROR",
      category: "COMPONENT_RENDER",
      message: "Error occurred during chart rendering",
      details: {
        chartError: chartError.message || String(chartError),
      },
      source,
    });
  }
  collectMapLoadError(mapUrl, httpStatus, statusText, source = "MapManager") {
    return this.collectError({
      type: "MAP_LOAD_FAILED",
      category: "CONFIG_DEPENDENCY",
      message: `HTTP ${httpStatus}: ${statusText}`,
      details: {
        mapUrl,
        httpStatus,
        statusText,
      },
      source,
    });
  }
  generateErrorId() {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  generateWarningId() {
    return `warning_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  captureContext(errorInfo) {
    return {
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      dashboardState: {
        cardsCount: document.querySelectorAll(".base-card").length,
        loadingCards: document.querySelectorAll(".base-card .loading").length,
        errorCards: document.querySelectorAll(".base-card .error-card").length,
      },
    };
  }
  logError(error) {
    const prefix = `[ErrorCollector]`;
    const message = `${prefix} [ERROR] ${error.type}: ${error.message}`;
    console.error(message, error);
  }
  logWarning(warning) {
    const prefix = `[ErrorCollector]`;
    const message = `${prefix} [WARNING] ${warning.type}: ${warning.message}`;
    console.warn(message, warning);
  }
  notifyListeners(error) {
    this.listeners.forEach(listener => {
      try {
        listener(error);
      } catch (e) {
        console.error("[ErrorCollector] Listener execution failed:", e);
      }
    });
  }
  addListener(listener) {
    if (typeof listener === "function") {
      this.listeners.push(listener);
    }
  }
  removeListener(listener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
  getErrorStats() {
    const stats = {
      totalErrors: this.errors.length,
      totalWarnings: this.warnings.length,
      errorsByType: Object.fromEntries(this.errorCounts),
      warningsByType: Object.fromEntries(this.warningCounts),
      errorsByCategory: {},
      warningsByCategory: {},
      errorsBySeverity: {},
      recentErrors: this.errors.slice(-10),
      recentWarnings: this.warnings.slice(-10),
    };
    this.errors.forEach(error => {
      const category = error.category;
      stats.errorsByCategory[category] = (stats.errorsByCategory[category] || 0) + 1;
    });
    this.warnings.forEach(warning => {
      const category = warning.category;
      stats.warningsByCategory[category] = (stats.warningsByCategory[category] || 0) + 1;
    });
    stats.errorsBySeverity = {
      ERROR: this.errors.length,
      WARNING: this.warnings.length,
    };
    return stats;
  }
  getErrorsByType(type) {
    return this.errors.filter(error => error.type === type);
  }
  getErrorsByCategory(category) {
    return this.errors.filter(error => error.category === category);
  }
  getErrorsByTimeRange(startTime, endTime) {
    return this.errors.filter(error => error.timestamp >= startTime && error.timestamp <= endTime);
  }
  getWarningsByType(type) {
    return this.warnings.filter(warning => warning.type === type);
  }
  getWarningsByCategory(category) {
    return this.warnings.filter(warning => warning.category === category);
  }
  getWarningsByTimeRange(startTime, endTime) {
    return this.warnings.filter(warning => warning.timestamp >= startTime && warning.timestamp <= endTime);
  }
  clearErrors() {
    this.errors = [];
    this.errorCounts.clear();
  }
  clearErrorsByType(type) {
    this.errors = this.errors.filter(error => error.type !== type);
    this.errorCounts.delete(type);
  }
  clearWarnings() {
    this.warnings = [];
    this.warningCounts.clear();
  }
  clearWarningsByType(type) {
    this.warnings = this.warnings.filter(warning => warning.type !== type);
    this.warningCounts.delete(type);
  }
  getStatus() {
    return {
      totalErrors: this.errors.length,
      totalWarnings: this.warnings.length,
      listenersCount: this.listeners.length,
    };
  }
  // 获取特定卡片ID列表的错误统计
  getCardErrorStats(cardIds) {
    const cardErrorMap = new Map();
    const cardErrorCounts = new Map();
    // 初始化所有卡片为无错误状态
    cardIds.forEach(cardId => {
      cardErrorMap.set(cardId, []);
      cardErrorCounts.set(cardId, 0);
    });
    // 统计每个卡片的错误
    this.errors.forEach(error => {
      if (error.cardId && cardIds.includes(error.cardId)) {
        const cardErrors = cardErrorMap.get(error.cardId) || [];
        cardErrors.push(error);
        cardErrorMap.set(error.cardId, cardErrors);
        cardErrorCounts.set(error.cardId, cardErrors.length);
      }
    });
    // 计算有错误的卡片数量
    const cardsWithErrors = Array.from(cardErrorCounts.values()).filter(count => count > 0).length;
    return {
      totalCards: cardIds.length,
      cardsWithErrors,
      cardsWithoutErrors: cardIds.length - cardsWithErrors,
      cardErrorMap,
      cardErrorCounts,
      totalErrorsForCards: Array.from(cardErrorCounts.values()).reduce((sum, count) => sum + count, 0)
    };
  }
}
window.ErrorCollector = new ErrorCollector();
window.ErrorCollector.ErrorCollector = ErrorCollector;

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
// Math utility function - Ceiling with precision support
const ceil = (value, precision = 0) => {
  const multiplier = Math.pow(10, precision);
  return Math.ceil(value * multiplier) / multiplier;
};
// Math utility function - Floor with precision support
const floor = (value, precision = 0) => {
  const multiplier = Math.pow(10, precision);
  return Math.floor(value * multiplier) / multiplier;
};
const getDashboardDefaultConfig = () => {
  return {
    // Base font size
    BASE_FONT_SIZE: "12px",
    // Grid column count, defines horizontal division quantity
    GRID_COLS: 24,
    // Default row height (pixels), base height for each grid cell
    GRID_DEFAULT_ROW_HEIGHT: 32,
    // Spacing between grid items [horizontal spacing, vertical spacing]
    GRID_MARGIN: [10, 10],
    // Container padding [horizontal padding, vertical padding]
    GRID_CONTAINER_PADDING: [10, 10],
    // Page background color - Clean base
    BODY_BACKGROUND: "#ffffff",
    // Page gradient background image, css background-image property - Subtle theme color gradient
    BODY_BACKGROUND_IMAGE: ["linear-gradient(135deg, rgba(49, 92, 236, 0.04) 0%, rgba(248, 250, 252, 0.6) 50%, #ffffff 100%)", "radial-gradient(circle at 15% 85%, rgba(49, 92, 236, 0.06) 0%, transparent 40%)", "radial-gradient(circle at 85% 15%, rgba(49, 92, 236, 0.03) 0%, transparent 40%)"],
    // Page font family
    BODY_FONT_FAMILY: '"Microsoft YaHei", "PingFang SC", "Hiragino Sans GB", "SimSun", sans-serif',
    // Primary color
    COLORS_PRIMARY: "#6851ff",
    // Success status color
    COLORS_SUCCESS: "#52c41a",
    // Warning status color
    COLORS_WARNING: "#faad14",
    // Error status color
    COLORS_ERROR: "#ff4d4f",
    // Info color
    COLORS_INFO: "#1677ff",
    // Link color
    COLORS_LINK: "#315cec",
    // Primary text color
    COLORS_TEXT_PRIMARY: "rgba(28, 29, 35, 1)",
    // Secondary text color
    COLORS_TEXT_SECONDARY: "rgba(28, 29, 35, 0.8)",
    // Tertiary text color
    COLORS_TEXT_THIRD: "rgba(28, 29, 35, 0.6)",
    // Border color
    COLORS_BORDER: "rgba(28, 29, 35, 0.08)",
    // Card background color
    CARD_BACKGROUND: "rgba(255, 255, 255, 1)",
    // Card title font size
    CARD_TITLE_FONT_SIZE: "14px",
    // Card border width (pixels)
    CARD_BORDER_WIDTH: "0px",
    // Card border color
    CARD_BORDER_COLOR: "rgba(28, 29, 35, 0.08)",
    // Border style: solid, dashed, dotted
    CARD_BORDER_STYLE: "solid",
    // Border radius (pixels)
    CARD_BORDER_RADIUS: "4px",
    // Card padding (pixels)
    CARD_GAP: "10px",
    // Card shadow - Very subtle shadow
    CARD_SHADOW: "0 0 8px 1px rgba(0, 0, 0, 0.05)",
    // Hover border color
    CARD_HOVER_BORDER_COLOR: "rgba(28, 29, 35, 0.08)",
    // Border style: solid, dashed, dotted
    CARD_HOVER_BORDER_STYLE: "solid",
    // Hover shadow style - Enhanced subtle elevation
    CARD_HOVER_SHADOW: "0 0 6px 1px rgba(0, 0, 0, 0.1)",
    // Table font size
    TABLE_FONT_SIZE: "12px",
    // Table header background color
    TABLE_HEADER_BACKGROUND_COLOR: "#6851ff",
    // Table cell minimum width
    TABLE_CELL_MIN_WIDTH: "80px",
    // Table cell height
    TABLE_CELL_HEIGHT: "32px",
    // Table cell padding
    TABLE_CELL_PADDING: "0 10px",
    // Table border color
    TABLE_BORDER_COLOR: "rgba(28, 29, 35, 0.08)",
    // Table border radius
    TABLE_BORDER_RADIUS: "4px",
    // ECharts color palette
    ECHARTS_COLOR: ["#6851ff", "#4c9dff", "#57c7e6", "#4cc9a6", "#3e7d6b", "#f3bd51", "#fd905a", "#e65454", "#f3738c", "#c34b9d", "#7a89a6", "#4c4c5c"],
    // Enable card hover interaction effects
    INTERACTION_CARD_HOVERABLE: true,
    // Metric card icon type: circle, normal
    METRIC_CARD_ICON_TYPE: "circle",
  };
};
// Parse color string to RGB values
const parseColorToRGB = (colorStr) => {
  // Handle hex colors
  if (colorStr.startsWith('#')) {
    const hex = colorStr.replace('#', '');
    if (hex.length === 3) {
      // Short hex format (#RGB)
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16)
      };
    } else if (hex.length === 6) {
      // Full hex format (#RRGGBB)
      return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16)
      };
    }
  }
  // Handle rgb() and rgba() colors
  const rgbMatch = colorStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+)?\s*\)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10)
    };
  }
  // Handle hsl() and hsla() colors
  const hslMatch = colorStr.match(/hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*[\d.]+)?\s*\)/);
  if (hslMatch) {
    const h = parseInt(hslMatch[1], 10);
    const s = parseInt(hslMatch[2], 10) / 100;
    const l = parseInt(hslMatch[3], 10) / 100;
    // Convert HSL to RGB
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }
  // Handle named colors (basic set)
  const namedColors = {
    red: { r: 255, g: 0, b: 0 },
    green: { r: 0, g: 128, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    white: { r: 255, g: 255, b: 255 },
    black: { r: 0, g: 0, b: 0 },
    yellow: { r: 255, g: 255, b: 0 },
    cyan: { r: 0, g: 255, b: 255 },
    magenta: { r: 255, g: 0, b: 255 },
    orange: { r: 255, g: 165, b: 0 },
    purple: { r: 128, g: 0, b: 128 },
    pink: { r: 255, g: 192, b: 203 },
    gray: { r: 128, g: 128, b: 128 },
    grey: { r: 128, g: 128, b: 128 }
  };
  const lowerColor = colorStr.toLowerCase();
  if (namedColors[lowerColor]) {
    return namedColors[lowerColor];
  }
  // Fallback: return default color
  return { r: 0, g: 0, b: 0 };
};
// Generate gradient background based on iconColor
const getCircleGradientBackground = (iconColor, fallbackColor = "#000000") => {
  const baseColor = iconColor || fallbackColor;
  try {
    // Parse color to RGB
    const rgb = parseColorToRGB(baseColor);
    // Convert RGB to HSL
    const rNorm = rgb.r / 255;
    const gNorm = rgb.g / 255;
    const bNorm = rgb.b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const diff = max - min;
    let h = 0;
    if (diff !== 0) {
      if (max === rNorm) h = ((gNorm - bNorm) / diff) % 6;
      else if (max === gNorm) h = (bNorm - rNorm) / diff + 2;
      else h = (rNorm - gNorm) / diff + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    const l = (max + min) / 2;
    const s = diff === 0 ? 0 : diff / (1 - Math.abs(2 * l - 1));
    // Create gradient colors
    const lightColor = `hsl(${h}, ${Math.min(s * 100 + 10, 80)}%, ${Math.min(l * 100 + 15, 75)}%)`;
    const darkColor = `hsl(${h}, ${Math.min(s * 100 + 20, 90)}%, ${Math.max(l * 100 - 10, 40)}%)`;
    return `linear-gradient(135deg, ${darkColor} 0%, ${lightColor} 100%)`;
  } catch (error) {
    // Fallback gradient for unparseable colors
    return `linear-gradient(135deg, ${baseColor} 0%, ${baseColor} 100%)`;
  }
};
// Generate mobile dashboard configuration based on desktop configuration
const createMobileDashboardConfig = (dashboardConfig) => {
  if (!dashboardConfig) {
    return null;
  }
  return {
    ...dashboardConfig,
    GRID_COLS: 12,
    GRID_CONTAINER_PADDING: [6, 6],
    GRID_DEFAULT_ROW_HEIGHT: 32,
    GRID_MARGIN: [6, 6],
    INTERACTION_CARD_HOVERABLE: true,
    BASE_FONT_SIZE: "10px",
    CARD_TITLE_FONT_SIZE: "12px",
    CARD_GAP: "6px",
    TABLE_FONT_SIZE: "11px",
    TABLE_CELL_MIN_WIDTH: "80px",
    TABLE_CELL_HEIGHT: "28px",
    TABLE_CELL_PADDING: "0 6px",
  };
};
// Generate mobile editor configuration based on desktop configuration
const createMobileEditorConfig = (editorConfig) => {
  return {
    ...editorConfig,
    DRAGGABLE: false,
    RESIZABLE: false,
    DELETABLE: false,
    EXPANDABLE: true,
  };
};
// Put all utility functions under the UTILS namespace
window.UTILS = {
  debounce,
  ceil,
  floor,
  getDashboardDefaultConfig,
  parseColorToRGB,
  getCircleGradientBackground,
  createMobileDashboardConfig,
  createMobileEditorConfig,
};

// Map registration manager
class MapManager {
  constructor() {
    this.registeredMaps = new Set();
    this.currentMapsConfig = [];
    this.registrationPromises = new Map();
    this.registrationResults = new Map();
  }
  /**
   * Smart synchronization of map configuration (automatically identify additions and deletions)
   * @param {Array} newMapsConfig - New map configuration array
   */
  async syncMapsConfig(newMapsConfig) {
    if (!window.echarts) {
      console.error("[MapManager] ECharts not loaded");
      return;
    }
    const newMaps = newMapsConfig || [];
    const oldMaps = this.currentMapsConfig || [];
    console.log(`[MapManager] Starting map configuration synchronization`);
    const addedMaps = newMaps.filter(newMap => !oldMaps.find(oldMap => oldMap.name === newMap.name));
    const removedMaps = oldMaps.filter(oldMap => !newMaps.find(newMap => newMap.name === oldMap.name));
    const modifiedMaps = newMaps.filter(newMap => {
      const oldMap = oldMaps.find(old => old.name === newMap.name);
      return oldMap && oldMap.url !== newMap.url;
    });
    this.currentMapsConfig = [...newMaps];
    for (const removedMap of removedMaps) {
      await this.unregisterMap(removedMap.name);
    }
    for (const modifiedMap of modifiedMaps) {
      await this.unregisterMap(modifiedMap.name);
      this.registrationResults.delete(modifiedMap.name);
      await this.registerMap(modifiedMap);
    }
    for (const addedMap of addedMaps) {
      await this.registerMap(addedMap);
    }
    console.log(`[MapManager] Map configuration synchronization completed`);
  }
  /**
   * Register a single map
   * @param {Object} map - Map configuration object {name, url}
   * @returns {Promise<boolean>} Whether registration was successful
   */
  async registerMap(map) {
    const { name, url } = map;
    if (!name || !url) {
      console.warn(`[MapManager] Invalid map configuration:`, map);
      return false;
    }
    if (this.registrationPromises.has(name)) {
      return await this.registrationPromises.get(name);
    }
    if (this.registeredMaps.has(name)) {
      return true;
    }
    if (this.registrationResults.has(name)) {
      const cachedResult = this.registrationResults.get(name);
      if (cachedResult) {
        return true;
      }
    }
    const registrationPromise = this._performRegistration(name, url);
    this.registrationPromises.set(name, registrationPromise);
    try {
      const result = await registrationPromise;
      this.registrationResults.set(name, result);
      if (result) {
        this.registeredMaps.add(name);
        console.log(`[MapManager] SUCCESS ${name} registration successful`);
      } else {
        console.error(`[MapManager] ERROR ${name} registration failed`);
      }
      return result;
    } finally {
      this.registrationPromises.delete(name);
    }
  }
  /**
   * Perform actual registration operation
   * @param {string} name - Map name
   * @param {string} url - Map data URL
   * @returns {Promise<boolean>} Whether registration was successful
   */
  async _performRegistration(name, url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        if (window.ErrorCollector) {
          window.ErrorCollector.collectMapLoadError(url, response.status, response.statusText, "MapManager");
        }
        throw error;
      }
      const geoJson = await response.json();
      window.echarts.registerMap(name, geoJson);
      return true;
    } catch (error) {
      console.error(`[MapManager] ${name} registration failed:`, error.message);
      return false;
    }
  }
  /**
   * Unregister a single map
   * @param {string} mapName - Map name
   */
  async unregisterMap(mapName) {
    if (!mapName) {
      console.warn(`[MapManager] Invalid map name`);
      return false;
    }
    if (this.registrationPromises.has(mapName)) {
      await this.registrationPromises.get(mapName);
    }
    if (!this.registeredMaps.has(mapName)) {
      return true;
    }
    try {
      window.echarts.registerMap(mapName, {
        type: "FeatureCollection",
        features: [],
      });
      this.registeredMaps.delete(mapName);
      this.registrationResults.delete(mapName);
      return true;
    } catch (error) {
      console.error(`[MapManager] ERROR ${mapName} unregistration failed:`, error.message);
      return false;
    }
  }
  /**
   * Check if map is registered
   * @param {string} mapName - Map name
   */
  isMapRegistered(mapName) {
    return this.registeredMaps.has(mapName);
  }
  /**
   * Check if map is being registered
   * @param {string} mapName - Map name
   */
  isMapRegistering(mapName) {
    return this.registrationPromises.has(mapName);
  }
  /**
   * Ensure specified map is registered (if exists in configuration but not registered, attempt to register)
   * @param {string} mapName - Map name
   * @returns {Promise<boolean>} Whether successfully registered or already registered
   */
  async ensureMapRegistered(mapName) {
    if (this.isMapRegistered(mapName)) {
      return true;
    }
    if (this.isMapRegistering(mapName)) {
      return await this.registrationPromises.get(mapName);
    }
    const mapConfig = this.currentMapsConfig.find(map => map.name === mapName);
    if (mapConfig) {
      return await this.registerMap(mapConfig);
    }
    console.warn(`[MapManager] Map "${mapName}" not in configuration`);
    return false;
  }
  /**
   * Ensure multiple maps are all registered
   * @param {string[]} mapNames - Array of map names
   * @returns {Promise<boolean>} Whether all maps are successfully registered
   */
  async ensureMapsRegistered(mapNames) {
    if (!mapNames || mapNames.length === 0) return true;
    console.log(`[MapManager] Starting to ensure ${mapNames.length} maps are registered`);
    const results = await Promise.all(
      mapNames.map(async mapName => {
        try {
          return await this.ensureMapRegistered(mapName);
        } catch (error) {
          console.error(`[MapManager] Error occurred while ensuring map "${mapName}" registration:`, error);
          return false;
        }
      })
    );
    const successCount = results.filter(Boolean).length;
    const allSuccess = results.every(result => result === true);
    console.log(`[MapManager] Map registration completed: ${successCount}/${mapNames.length} successful`);
    return allSuccess;
  }
}
window.MapManager = MapManager;
window.MapManager = new MapManager();

// CSV data management controller
class CSVManager {
  constructor() {
    this.dataSources = new Map();
    this.loadingPromises = new Map();
  }
  /**
   * Load CSV data file
   * @param {string} fileName - File name, corresponding to the name field in magicDashboard.dataSources array
   * @returns {Promise<CSVParseResult>} Returns parsed CSV data
   */
  async load(fileName) {
    if (!fileName || typeof fileName !== "string") {
      const error = new Error("Invalid file name");
      if (window.ErrorCollector) {
        window.ErrorCollector.collectInvalidFileNameError(fileName, "CSVManager");
      }
      throw error;
    }
    if (this.loadingPromises.has(fileName)) {
      return await this.loadingPromises.get(fileName);
    }
    if (this.dataSources.has(fileName)) {
      return this.dataSources.get(fileName);
    }
    const loadingPromise = (async () => {
      const dataSourceConfig = window.magicDashboard?.dataSources || [];
      const dataSource = dataSourceConfig.find(config => config.name === fileName);
      if (!dataSource || !dataSource.url) {
        const error = new Error(`File configuration not found in magicDashboard.dataSources: ${fileName}`);
        if (window.ErrorCollector) {
          window.ErrorCollector.collectDataSourceNotFoundError(fileName, "CSVManager");
        }
        throw error;
      }
      const fileUrl = dataSource.url;
      console.log(`[CSVManager] Starting to load file: ${fileName}`);
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
          if (window.ErrorCollector) {
            window.ErrorCollector.collectCSVLoadError(fileName, response.status, response.statusText, "CSVManager");
          }
          throw error;
        }
        const csvText = await response.text();
        if (!window.Papa) {
          throw new Error(`[CSVManager] PapaParse library not loaded, cannot parse CSV file: ${fileName}`);
        }
        return new Promise((resolve, reject) => {
          window.Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            trimHeaders: true,
            worker: true,
            complete: results => {
              if (results.errors && results.errors.length > 0) {
                console.warn(`[CSVManager] CSV parsing warnings (${fileName}):`, results.errors);
              }
              resolve({
                data: results.data,
                meta: results.meta,
                errors: results.errors,
                name: fileName,
                url: fileUrl,
              });
            },
            error: error => {
              console.error(`[CSVManager] CSV parsing failed (${fileName}):`, error);
              const parseError = new Error(`CSV parsing failed: ${error.message || error}`);
              if (window.ErrorCollector) {
                window.ErrorCollector.collectCSVParseError(fileName, error, "CSVManager");
              }
              reject(parseError);
            },
          });
        });
      } catch (error) {
        throw new Error(`File loading failed (${fileName}): ${error.message}`);
      }
    })();
    this.loadingPromises.set(fileName, loadingPromise);
    try {
      const result = await loadingPromise;
      this.dataSources.set(fileName, result);
      console.log(`[CSVManager] SUCCESS ${fileName} loading successful`);
      return result;
    } catch (error) {
      console.error(`[CSVManager] ERROR ${fileName} loading failed:`, error);
      throw error;
    } finally {
      this.loadingPromises.delete(fileName);
    }
  }
}
window.CSVManager = CSVManager;
window.CSVManager = new CSVManager();

// Smart CSS value formatting - automatically add px unit to numbers
function formatCSSValue(value) {
  if (value === null || value === undefined) return value;
  if (typeof value === "number") {
    return `${value}px`;
  }
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    if (/\d+(px|%|em|rem|vh|vw|vmin|vmax|pt|pc|in|cm|mm|ex|ch|fr)$/i.test(trimmedValue)) {
      return trimmedValue;
    }
    if (/^(auto|inherit|initial|unset|none|normal|bold|italic|center|left|right|top|bottom|middle|baseline)$/i.test(trimmedValue)) {
      return trimmedValue;
    }
    const numValue = parseFloat(trimmedValue);
    if (!isNaN(numValue) && trimmedValue === numValue.toString()) {
      return `${numValue}px`;
    }
  }
  return value;
}
// Apply theme styles
function applyThemeStyles(dashboardConfig) {
  const root = document.documentElement;
  if (!dashboardConfig) return;
  if (dashboardConfig.BODY_BACKGROUND) {
    root.style.setProperty("--body-background", dashboardConfig.BODY_BACKGROUND);
  }
  if (dashboardConfig.BODY_BACKGROUND_IMAGE && Array.isArray(dashboardConfig.BODY_BACKGROUND_IMAGE)) {
    root.style.setProperty("--body-background-image", dashboardConfig.BODY_BACKGROUND_IMAGE.join(", "));
  }
  if (dashboardConfig.BASE_FONT_SIZE) {
    root.style.setProperty("--base-font-size", dashboardConfig.BASE_FONT_SIZE);
  }
  if (dashboardConfig.BODY_FONT_FAMILY) {
    root.style.setProperty("--body-font-family", dashboardConfig.BODY_FONT_FAMILY);
  }
  if (dashboardConfig.COLORS_PRIMARY) {
    root.style.setProperty("--color-primary", dashboardConfig.COLORS_PRIMARY);
  }
  if (dashboardConfig.COLORS_SUCCESS) {
    root.style.setProperty("--color-success", dashboardConfig.COLORS_SUCCESS);
  }
  if (dashboardConfig.COLORS_WARNING) {
    root.style.setProperty("--color-warning", dashboardConfig.COLORS_WARNING);
  }
  if (dashboardConfig.COLORS_ERROR) {
    root.style.setProperty("--color-error", dashboardConfig.COLORS_ERROR);
  }
  if (dashboardConfig.COLORS_TEXT_PRIMARY) {
    root.style.setProperty("--color-text-primary", dashboardConfig.COLORS_TEXT_PRIMARY);
  }
  if (dashboardConfig.COLORS_TEXT_SECONDARY) {
    root.style.setProperty("--color-text-secondary", dashboardConfig.COLORS_TEXT_SECONDARY);
  }
  if (dashboardConfig.COLORS_BORDER) {
    root.style.setProperty("--color-border", dashboardConfig.COLORS_BORDER);
  }
  if (dashboardConfig.CARD_BACKGROUND) {
    root.style.setProperty("--card-background", dashboardConfig.CARD_BACKGROUND);
  }
  if (dashboardConfig.CARD_TITLE_FONT_SIZE) {
    root.style.setProperty("--card-title-font-size", formatCSSValue(dashboardConfig.CARD_TITLE_FONT_SIZE));
  }
  if (dashboardConfig.CARD_BORDER_WIDTH) {
    root.style.setProperty("--card-border-width", formatCSSValue(dashboardConfig.CARD_BORDER_WIDTH));
  }
  if (dashboardConfig.CARD_BORDER_COLOR) {
    root.style.setProperty("--card-border-color", dashboardConfig.CARD_BORDER_COLOR);
  }
  if (dashboardConfig.CARD_BORDER_STYLE) {
    root.style.setProperty("--card-border-style", dashboardConfig.CARD_BORDER_STYLE);
  }
  if (dashboardConfig.CARD_BORDER_RADIUS) {
    root.style.setProperty("--card-border-radius", formatCSSValue(dashboardConfig.CARD_BORDER_RADIUS));
  }
  if (dashboardConfig.CARD_GAP) {
    root.style.setProperty("--card-gap", formatCSSValue(dashboardConfig.CARD_GAP));
  }
  if (dashboardConfig.CARD_SHADOW) {
    root.style.setProperty("--card-shadow", dashboardConfig.CARD_SHADOW);
  }
  // Set CSS variables for card hover effects (only when hover effects are enabled)
  if (dashboardConfig.INTERACTION_CARD_HOVERABLE) {
    if (dashboardConfig.CARD_HOVER_BORDER_COLOR) {
      root.style.setProperty("--card-hover-border-color", dashboardConfig.CARD_HOVER_BORDER_COLOR);
    }
    if (dashboardConfig.CARD_HOVER_BORDER_STYLE) {
      root.style.setProperty("--card-hover-border-style", dashboardConfig.CARD_HOVER_BORDER_STYLE);
    }
    if (dashboardConfig.CARD_HOVER_SHADOW) {
      root.style.setProperty("--card-hover-shadow", dashboardConfig.CARD_HOVER_SHADOW);
    }
    root.style.setProperty("--card-hover-enabled", "1");
  } else {
    // Disable hover effects
    root.style.setProperty("--card-hover-enabled", "0");
  }
  // Compatible with old version CSS variable names
  if (dashboardConfig.CARD_BACKGROUND) {
    root.style.setProperty("--color-card-bg", dashboardConfig.CARD_BACKGROUND);
  }
  if (dashboardConfig.CARD_BORDER_RADIUS) {
    root.style.setProperty("--border-radius-small", formatCSSValue(dashboardConfig.CARD_BORDER_RADIUS));
  }
  if (dashboardConfig.CARD_SHADOW) {
    root.style.setProperty("--shadow-card", dashboardConfig.CARD_SHADOW);
  }
  if (dashboardConfig.CARD_HOVER_SHADOW) {
    root.style.setProperty("--shadow-hover", dashboardConfig.CARD_HOVER_SHADOW);
  }
}
window.StyleUtils = {
  formatCSSValue,
  applyThemeStyles,
};

// Mobile Grid Layout Component
class MobileGridLayout extends React.Component {
  constructor(props) {
    super(props);
    // Cache for layout calculations to avoid recalculating
    this.layoutCache = new Map();
    this.sortedCardsCache = null;
    this.lastCardsHash = null;
  }
  // Generate hash for cards array to detect changes
  generateCardsHash(cards) {
    return cards.map(card => `${card.id}-${card.type}-${JSON.stringify(card.layout)}`).join("|");
  }
  // Get mobile ECharts theme name
  getMobileEChartsThemeName() {
    return (window.ECHARTS_THEME_NAME || "dashboard") + "_mobile";
  }
  // Get sorted cards with caching
  getSortedCards(cards) {
    const cardsHash = this.generateCardsHash(cards);
    // Return cached result if cards haven't changed
    if (this.lastCardsHash === cardsHash && this.sortedCardsCache) {
      return this.sortedCardsCache;
    }
    // Calculate new sorted cards
    const sortedCards = [...cards].sort((a, b) => {
      // Priority order: metric > kpi (comparison) > others
      const getPriority = card => {
        if (card.type === "metric") return 1;
        if (card.type === "kpi") return 2; // KPI cards are often comparison cards
        return 3;
      };
      return getPriority(a) - getPriority(b);
    });
    // Cache the result
    this.sortedCardsCache = sortedCards;
    this.lastCardsHash = cardsHash;
    return sortedCards;
  }
  // Calculate height based on KPI content
  calculateKPIHeight(cardData) {
    // Check actual KPI card properties
    const hasTitle = cardData.title && cardData.title.trim() !== "";
    // Base height for KPI card (minimum space needed)
    let height = 0.5;
    // Add height for title if present
    if (hasTitle) {
      height += 1; // Title space
    }
    // Add height based on number of indicators
    if (cardData.data && cardData.data.indicators && Array.isArray(cardData.data.indicators)) {
      const indicatorCount = cardData.data.indicators.length;
      // Each indicator needs minimal space in mobile layout
      if (indicatorCount <= 2) {
        // 1-2 indicators: each takes ~1 unit
        height += indicatorCount * 1;
      } else if (indicatorCount <= 4) {
        // 3-4 indicators: each takes ~0.8 units (more compact)
        height += indicatorCount * 0.8;
      } else {
        // 5+ indicators: each takes ~0.7 units (very compact)
        height += indicatorCount * 0.7;
      }
      // Add minimal padding for visual separation
      height += 0.3;
    } else {
      // Default to 2 indicators if data structure is not available
      height += 2 * 1 + 0.3;
    }
    // Ensure minimum and maximum bounds for KPI
    // Minimum: 2 units (very compact)
    // Maximum: 7 units (for cases with many indicators)
    return Math.max(2, Math.min(Math.ceil(height), 7));
  }
  // Calculate height based on markdown content
  calculateMarkdownHeight(cardData) {
    // Check if card has title
    const hasTitle = cardData.title && cardData.title.trim() !== "";
    // Base height for markdown card
    let height = 2;
    // Add height for title if present
    if (hasTitle) height += 1;
    // Calculate height based on markdown content
    if (cardData.data && cardData.data.content && typeof cardData.data.content === "string") {
      const content = cardData.data.content.trim();
      // Count lines in markdown content
      const lines = content.split("\n");
      let contentLines = 0;
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") {
          // Empty lines add minimal height
          contentLines += 0.3;
        } else if (trimmedLine.startsWith("#")) {
          // Headers take more space
          const headerLevel = (trimmedLine.match(/^#+/) || [""])[0].length;
          contentLines += headerLevel <= 2 ? 1.5 : 1.2;
        } else if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ") || /^\d+\.\s/.test(trimmedLine)) {
          // List items
          contentLines += 1;
        } else if (trimmedLine.startsWith("```")) {
          // Code blocks take more space
          contentLines += 1.5;
        } else {
          // Regular text lines
          // Estimate line wrapping based on content length (assuming ~50 chars per line on mobile)
          const estimatedLines = Math.ceil(trimmedLine.length / 50);
          contentLines += Math.max(1, estimatedLines);
        }
      }
      // Convert content lines to grid height units (approximately 2-3 content lines per grid unit)
      height += Math.ceil(contentLines / 2.5);
    } else {
      // Default height if no content available
      height += 3;
    }
    // Ensure minimum and maximum bounds for markdown
    return Math.max(4, Math.min(Math.ceil(height), 12));
  }
  // Convert desktop layout to mobile layout intelligently with caching
  convertToMobileLayout(card, cardIndex, totalCols, allCards) {
    // Create cache key for this specific layout calculation
    const cacheKey = `${card.id}-${cardIndex}-${totalCols}-${allCards.length}`;
    // Return cached result if available
    if (this.layoutCache.has(cacheKey)) {
      return this.layoutCache.get(cacheKey);
    }
    const cardType = card.type;
    const desktopLayout = card.layout;
    if (cardType === "metric") {
      // Metric cards: 2 per row
      const mobileWidth = Math.floor(totalCols / 2);
      const mobileHeight = 2; // Smaller height for metric cards on mobile
      // Find how many metric cards are before this one
      let metricCardsBefore = 0;
      for (let i = 0; i < cardIndex; i++) {
        if (allCards[i].type === "metric") {
          metricCardsBefore++;
        }
      }
      // Calculate position based on metric card index
      const metricRowIndex = Math.floor(metricCardsBefore / 2);
      const isFirstInRow = metricCardsBefore % 2 === 0;
      // Calculate Y position considering non-metric cards before this metric card
      let yPosition = 0;
      for (let i = 0; i < cardIndex; i++) {
        const prevCard = allCards[i];
        if (prevCard.type !== "metric") {
          // Non-metric card takes full row
          const prevDesktopAspectRatio = prevCard.layout.w / prevCard.layout.h;
          const prevMobileHeight = Math.max(3, Math.min(Math.round(totalCols / prevDesktopAspectRatio), 8));
          yPosition += prevMobileHeight + 1;
        }
      }
      // Add metric rows height
      yPosition += metricRowIndex * (mobileHeight + 1);
      const layout = {
        i: card.id,
        x: isFirstInRow ? 0 : mobileWidth,
        y: yPosition,
        w: mobileWidth,
        h: mobileHeight,
        minW: Math.min(desktopLayout.minW || mobileWidth, mobileWidth),
        minH: Math.min(desktopLayout.minH || mobileHeight, mobileHeight),
        maxW: Math.min(desktopLayout.maxW || mobileWidth, mobileWidth),
        maxH: Math.min(desktopLayout.maxH || mobileHeight, mobileHeight),
      };
      // Cache the result
      this.layoutCache.set(cacheKey, layout);
      return layout;
    } else if (cardType === "kpi") {
      // KPI cards: 1 per row (full width) with dynamic height based on content
      const mobileWidth = totalCols;
      const mobileHeight = this.calculateKPIHeight(card);
      console.log("mobileHeight", mobileHeight);
      // Calculate Y position considering all previous cards
      let yPosition = 0;
      for (let i = 0; i < cardIndex; i++) {
        const prevCard = allCards[i];
        if (prevCard.type === "metric") {
          // Check if this metric card starts a new row
          let metricCardsBefore = 0;
          for (let j = 0; j < i; j++) {
            if (allCards[j].type === "metric") {
              metricCardsBefore++;
            }
          }
          const isFirstMetricInRow = metricCardsBefore % 2 === 0;
          if (isFirstMetricInRow) {
            yPosition += 2 + 1; // metric card height + gap
          }
        } else {
          // Non-metric card (KPI or other cards)
          let prevMobileHeight;
          if (prevCard.type === "kpi") {
            prevMobileHeight = this.calculateKPIHeight(prevCard);
          } else {
            // Height calculation for different card types
            prevMobileHeight = 6; // Base height for other cards
            if (prevCard.type === "echarts") {
              prevMobileHeight = 7; // ECharts cards: base + 1
            } else if (prevCard.type === "table") {
              prevMobileHeight = 8; // Table cards: base + 2
            } else if (prevCard.type === "markdown") {
              prevMobileHeight = this.calculateMarkdownHeight(prevCard); // Markdown cards: intelligent height calculation
            }
          }
          yPosition += prevMobileHeight + 1;
        }
      }
      const layout = {
        i: card.id,
        x: 0,
        y: yPosition,
        w: mobileWidth,
        h: mobileHeight,
        minW: Math.min(desktopLayout.minW || mobileWidth, mobileWidth),
        minH: Math.min(desktopLayout.minH || mobileHeight, mobileHeight),
        maxW: Math.min(desktopLayout.maxW || mobileWidth, mobileWidth),
        maxH: Math.min(desktopLayout.maxH || mobileHeight, mobileHeight),
      };
      // Cache the result
      this.layoutCache.set(cacheKey, layout);
      return layout;
    } else {
      // Other cards (chart, table, text, image, etc.): 1 per row (full width) with fixed height
      const mobileWidth = totalCols;
      // Height calculation for different card types (except metric and KPI)
      let mobileHeight = 6; // Base height for other cards
      if (cardType === "echarts") {
        mobileHeight = 7; // ECharts cards: base + 1
      } else if (cardType === "table") {
        mobileHeight = 8; // Table cards: base + 2
      } else if (cardType === "markdown") {
        mobileHeight = this.calculateMarkdownHeight(card); // Markdown cards: intelligent height calculation
      }
      // Calculate Y position considering all previous cards
      let yPosition = 0;
      for (let i = 0; i < cardIndex; i++) {
        const prevCard = allCards[i];
        if (prevCard.type === "metric") {
          // Check if this metric card starts a new row
          let metricCardsBefore = 0;
          for (let j = 0; j < i; j++) {
            if (allCards[j].type === "metric") {
              metricCardsBefore++;
            }
          }
          const isFirstMetricInRow = metricCardsBefore % 2 === 0;
          if (isFirstMetricInRow) {
            yPosition += 2 + 1; // metric card height + gap
          }
        } else {
          // Non-metric card (KPI or other cards)
          let prevMobileHeight;
          if (prevCard.type === "kpi") {
            prevMobileHeight = this.calculateKPIHeight(prevCard);
          } else {
            // Height calculation for different card types
            prevMobileHeight = 6; // Base height for other cards
            if (prevCard.type === "echarts") {
              prevMobileHeight = 7; // ECharts cards: base + 1
            } else if (prevCard.type === "table") {
              prevMobileHeight = 8; // Table cards: base + 2
            } else if (prevCard.type === "markdown") {
              prevMobileHeight = this.calculateMarkdownHeight(prevCard); // Markdown cards: intelligent height calculation
            }
          }
          yPosition += prevMobileHeight + 1;
        }
      }
      const layout = {
        i: card.id,
        x: 0,
        y: yPosition,
        w: mobileWidth,
        h: mobileHeight,
        minW: Math.min(desktopLayout.minW || mobileWidth, mobileWidth),
        minH: Math.min(desktopLayout.minH || mobileHeight, mobileHeight),
        maxW: Math.min(desktopLayout.maxW || mobileWidth, mobileWidth),
        maxH: Math.min(desktopLayout.maxH || mobileHeight, mobileHeight),
      };
      // Cache the result
      this.layoutCache.set(cacheKey, layout);
      return layout;
    }
  }
  // Optimize re-rendering by checking if props have actually changed
  shouldComponentUpdate(nextProps) {
    // Check if cards array has changed
    if (this.props.cards !== nextProps.cards) {
      return true;
    }
    // Check if other important props have changed
    if (this.props.visible !== nextProps.visible || this.props.editorConfig !== nextProps.editorConfig || this.props.dashboardConfig !== nextProps.dashboardConfig) {
      return true;
    }
    return false;
  }
  // Clear cache when component unmounts
  componentWillUnmount() {
    this.layoutCache.clear();
    this.sortedCardsCache = null;
    this.lastCardsHash = null;
  }
  // Clear cache when cards change significantly
  componentDidUpdate(prevProps) {
    // If cards array reference changed, clear layout cache
    if (prevProps.cards !== this.props.cards) {
      this.layoutCache.clear();
    }
  }
  // Check and register mobile ECharts theme on component mount
  componentDidMount() {
    this.ensureMobileEChartsTheme();
  }
  // Ensure mobile ECharts theme is registered
  ensureMobileEChartsTheme() {
    const echartsThemeName = this.getMobileEChartsThemeName();
    // Check if ECharts is available and theme is not already registered
    if (window.echarts && window.GET_ECHARTS_THEME_CONFIG) {
      // Use mobile dashboard configuration directly from props
      const { dashboardConfig } = this.props;
      try {
        const mobileThemeConfig = window.GET_ECHARTS_THEME_CONFIG(dashboardConfig);
        window.echarts.registerTheme(echartsThemeName, mobileThemeConfig);
      } catch (error) {
        console.warn(`Failed to register mobile ECharts theme: ${echartsThemeName}`, error);
      }
    }
  }
  render() {
    const { cards, editorConfig, dashboardConfig, onDeleteCard, visible, createCardFromConfig, GridLayout } = this.props;
    // Define mobile-specific ECharts theme configuration
    const echartsThemeName = this.getMobileEChartsThemeName();
    // Get sorted cards with caching
    const sortedCards = this.getSortedCards(cards);
    // Create card elements for mobile (no drag/resize/hover support) using sorted cards
    // Use map with optimized rendering
    const cardElements = sortedCards.map(cardConfig => {
      const className = `grid-item mobile-grid-item non-draggable non-resizable non-hoverable`;
      const cardElement = visible
        ? createCardFromConfig(cardConfig, {
            editorConfig,
            dashboardConfig,
            onDeleteCard,
            echartsThemeName,
          })
        : null;
      return React.createElement(
        "div",
        {
          key: cardConfig.id,
          className: className,
          style: { visibility: visible ? "visible" : "hidden" },
        },
        cardElement
      );
    });
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        GridLayout,
        {
          className: "layout mobile-layout",
          layout: sortedCards.map((card, index) => this.convertToMobileLayout(card, index, dashboardConfig.GRID_COLS, sortedCards)),
          cols: dashboardConfig.GRID_COLS,
          rowHeight: dashboardConfig.GRID_DEFAULT_ROW_HEIGHT,
          isDraggable: false, // Force disable dragging on mobile
          isResizable: false, // Force disable resizing on mobile
          margin: dashboardConfig.GRID_MARGIN,
          containerPadding: dashboardConfig.GRID_CONTAINER_PADDING,
          useCSSTransforms: true,
          transformScale: 1,
          allowOverlap: false,
          preventCollision: true, // Prevent collision on mobile
        },
        ...cardElements
      ),
      // No resizing overlay for mobile since resizing is disabled
      null
    );
  }
}
window.MobileGridLayout = MobileGridLayout;

// Grid dashboard component
class GridDashboard extends React.Component {
  constructor(props) {
    super(props);
    const { WidthProvider } = window.ReactGridLayout;
    this.GridLayout = WidthProvider(window.ReactGridLayout);
    const initialIsMobile = this.detectMobileDevice();
    this.state = {
      visible: false,
      rowHeight: this.calculateDynamicRowHeight(),
      isResizing: false,
      isDragging: false,
      isExpanding: false,
      isMobile: initialIsMobile,
    };
    // Cache for mobile configurations to avoid recreating on each render
    // Initialize with default values based on initial mobile state
    this.mobileConfigCache = {
      editorConfig: initialIsMobile ? window.UTILS?.createMobileEditorConfig(props.editorConfig) : null,
      dashboardConfig: initialIsMobile ? window.UTILS?.createMobileDashboardConfig(props.dashboardConfig) : null,
      lastEditorConfigRef: initialIsMobile ? props.editorConfig : null,
      lastDashboardConfigRef: initialIsMobile ? props.dashboardConfig : null,
    };
    this.cardRenderStatus = new Map();
    this.hasNotifiedAllCardsComplete = false;
    this.handleResize = this.handleResize.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
    this.handleResizeStart = this.handleResizeStart.bind(this);
    this.handleResizeStop = this.handleResizeStop.bind(this);
    this.handleCardRenderStatusChange = this.handleCardRenderStatusChange.bind(this);
    this.detectMobileDevice = this.detectMobileDevice.bind(this);
    this.debouncedResize = window.UTILS.debounce(this.handleResize, 100);
  }
  // Detect if current device is mobile
  detectMobileDevice() {
    // Check user agent for mobile devices
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    // Check screen width (consider devices with width <= 768px as mobile)
    const isMobileScreenSize = window.innerWidth <= 768;
    // Return true if any mobile indicator is present
    return isMobileUserAgent || isMobileScreenSize;
  }
  // Get mobile configurations with caching
  getMobileConfigs(editorConfig, dashboardConfig) {
    // Check if configs have changed (by reference)
    if (this.mobileConfigCache.lastEditorConfigRef === editorConfig && 
        this.mobileConfigCache.lastDashboardConfigRef === dashboardConfig && 
        this.mobileConfigCache.editorConfig && 
        this.mobileConfigCache.dashboardConfig) {
      return {
        mobileEditorConfig: this.mobileConfigCache.editorConfig,
        mobileDashboardConfig: this.mobileConfigCache.dashboardConfig,
      };
    }
    // Create new mobile configurations
    const mobileEditorConfig = window.UTILS?.createMobileEditorConfig(editorConfig);
    const mobileDashboardConfig = window.UTILS?.createMobileDashboardConfig(dashboardConfig);
    // Cache the configurations
    this.mobileConfigCache.editorConfig = mobileEditorConfig;
    this.mobileConfigCache.dashboardConfig = mobileDashboardConfig;
    this.mobileConfigCache.lastEditorConfigRef = editorConfig;
    this.mobileConfigCache.lastDashboardConfigRef = dashboardConfig;
    return {
      mobileEditorConfig,
      mobileDashboardConfig,
    };
  }
  handleCardRenderStatusChange(statusInfo) {
    const { cardId, status, error, timestamp } = statusInfo;
    this.cardRenderStatus.set(cardId, {
      status,
      error,
      timestamp,
    });
    this.checkAllCardsRenderComplete();
  }
  checkAllCardsRenderComplete() {
    const { cards } = this.props;
    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      return;
    }
    if (this.hasNotifiedAllCardsComplete) {
      return;
    }
    const allCardsComplete = cards.every(card => {
      const status = this.cardRenderStatus.get(card.id);
      return status && (status.status === "success" || status.status === "error");
    });
    if (allCardsComplete) {
      this.hasNotifiedAllCardsComplete = true;
      const cardsStatus = cards.map(card => ({
        cardId: card.id,
        cardTitle: card.title,
        cardType: card.type,
        ...this.cardRenderStatus.get(card.id),
      }));
      const successCount = cardsStatus.filter(card => card.status === "success").length;
      const errorCount = cardsStatus.filter(card => card.status === "error").length;
      if (this.props.onAllCardsRenderComplete) {
        this.props.onAllCardsRenderComplete({
          totalCards: cards.length,
          successCount,
          errorCount,
          cardsStatus,
          timestamp: Date.now(),
        });
      }
    }
  }
  resetRenderStatus(newCards) {
    this.cardRenderStatus.clear();
    this.hasNotifiedAllCardsComplete = false;
    if (newCards && Array.isArray(newCards)) {
      newCards.forEach(card => {
        this.cardRenderStatus.set(card.id, {
          status: "loading",
          error: null,
          timestamp: Date.now(),
        });
      });
    }
  }
  calculateDynamicRowHeight() {
    const config = this.props.dashboardConfig;
    if (!config) return 32;
    const wrapperHeight = window.innerHeight;
    const layoutMargin = config.GRID_MARGIN[0];
    const layoutPadding = config.GRID_CONTAINER_PADDING[0];
    const maxRows = window.UTILS.ceil((wrapperHeight + layoutMargin - layoutPadding + layoutPadding) / (config.GRID_DEFAULT_ROW_HEIGHT + layoutMargin), 0);
    const maxRowsHeight = maxRows * config.GRID_DEFAULT_ROW_HEIGHT + (maxRows - 1) * layoutMargin + layoutPadding * 2;
    const subtractHeight = wrapperHeight - maxRowsHeight;
    const subRowHeight = window.UTILS.floor(subtractHeight / maxRows, 2);
    const resultRowHeight = config.GRID_DEFAULT_ROW_HEIGHT + subRowHeight;
    return resultRowHeight;
  }
  handleResize() {
    const newRowHeight = this.calculateDynamicRowHeight();
    const newIsMobile = this.detectMobileDevice();
    if (newRowHeight !== this.state.rowHeight || newIsMobile !== this.state.isMobile) {
      this.setState({
        rowHeight: newRowHeight,
        isMobile: newIsMobile,
      });
    }
  }
  handleDragStart(layout, oldItem, newItem, placeholder, e, element) {
    this.setState({ isDragging: true });
    if (this.props.onDragStart) {
      this.props.onDragStart(layout, oldItem, newItem, placeholder, e, element);
    }
  }
  handleDragStop(layout, oldItem, newItem, placeholder, e, element) {
    this.setState({ isDragging: false });
    if (this.props.onDragStop) {
      this.props.onDragStop(layout, oldItem, newItem, placeholder, e, element);
    }
  }
  handleResizeStart(layout, oldItem, newItem, placeholder, e, element) {
    this.setState({ isResizing: true });
    if (this.props.onResizeStart) {
      this.props.onResizeStart(layout, oldItem, newItem, placeholder, e, element);
    }
  }
  handleResizeStop(layout, oldItem, newItem, placeholder, e, element) {
    this.setState({ isResizing: false });
    if (this.props.onResizeStop) {
      this.props.onResizeStop(layout, oldItem, newItem, placeholder, e, element);
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.debouncedResize);
    this.handleResize();
    this.resetRenderStatus(this.props.cards);
    // Apply theme styles based on current mobile state
    const configToApply = this.state.isMobile 
      ? this.getMobileConfigs(this.props.editorConfig, this.props.dashboardConfig).mobileDashboardConfig
      : this.props.dashboardConfig;
    if (window.DashboardFramework?.applyThemeStyles && configToApply) {
      window.DashboardFramework.applyThemeStyles(configToApply);
    }
    setTimeout(() => {
      this.setState({ visible: true });
    }, 100);
  }
  // Check card changes when component updates
  componentDidUpdate(prevProps, prevState) {
    // If card list changes, reset render status
    if (prevProps.cards !== this.props.cards) {
      this.resetRenderStatus(this.props.cards);
    }
    // Clear mobile config cache if editor or dashboard config changes
    if (prevProps.editorConfig !== this.props.editorConfig || 
        prevProps.dashboardConfig !== this.props.dashboardConfig) {
      this.mobileConfigCache.editorConfig = null;
      this.mobileConfigCache.dashboardConfig = null;
      this.mobileConfigCache.lastEditorConfigRef = null;
      this.mobileConfigCache.lastDashboardConfigRef = null;
    }
    // If dashboard configuration changes, apply theme styles
    if (prevProps.dashboardConfig !== this.props.dashboardConfig) {
      if (window.DashboardFramework?.applyThemeStyles && this.props.dashboardConfig) {
        window.DashboardFramework.applyThemeStyles(this.props.dashboardConfig);
      }
    }
    // If mobile state changes, apply appropriate theme styles
    if (prevState.isMobile !== this.state.isMobile) {
      const configToApply = this.state.isMobile 
        ? this.getMobileConfigs(this.props.editorConfig, this.props.dashboardConfig).mobileDashboardConfig
        : this.props.dashboardConfig;
      if (window.DashboardFramework?.applyThemeStyles && configToApply) {
        window.DashboardFramework.applyThemeStyles(configToApply);
      }
    }
  }
  // Remove event listeners when component unmounts
  componentWillUnmount() {
    window.removeEventListener("resize", this.debouncedResize);
  }
  // Create card instance based on card configuration with dynamic parameters
  createCardFromConfig(cardConfig, ...additionalProps) {
    // Extract common props and merge additional props if provided
    const extraProps = additionalProps.length > 0 ? Object.assign({}, ...additionalProps) : {};
    return React.createElement(window.BaseCard, {
      ...cardConfig,
      onRenderStatusChange: this.handleCardRenderStatusChange,
      isMobile: this.state.isMobile,
      echartsThemeName: window.ECHARTS_THEME_NAME || "default",
      ...extraProps, // Spread additional dynamic props (including editorConfig, dashboardConfig, onDeleteCard)
    });
  }
  // Render mobile layout
  renderMobileLayout() {
    const { cards, editorConfig, dashboardConfig, onDeleteCard } = this.props;
    const { visible } = this.state;
    // Get cached mobile configurations
    const { mobileEditorConfig, mobileDashboardConfig } = this.getMobileConfigs(editorConfig, dashboardConfig);
    return React.createElement(window.MobileGridLayout, {
      cards,
      editorConfig: mobileEditorConfig,
      dashboardConfig: mobileDashboardConfig,
      onDeleteCard,
      visible,
      createCardFromConfig: this.createCardFromConfig.bind(this),
      GridLayout: this.GridLayout,
    });
  }
  // Render desktop layout
  renderDesktopLayout() {
    const { cards, onLayoutChange, editorConfig, dashboardConfig, onDeleteCard } = this.props;
    const GridLayout = this.GridLayout;
    const { rowHeight, visible, isResizing } = this.state;
    const config = dashboardConfig;
    // Desktop grid configuration
    const gridConfig = {
      cols: config.GRID_COLS,
      margin: config.GRID_MARGIN,
      containerPadding: config.GRID_CONTAINER_PADDING,
    };
    // Create card elements for desktop
    const cardElements = cards.map(cardConfig => {
      const isDraggable = editorConfig?.DRAGGABLE || false;
      const isHoverable = dashboardConfig.INTERACTION_CARD_HOVERABLE;
      const className = `grid-item desktop-grid-item ${isDraggable ? "draggable" : "non-draggable"} ${isHoverable ? "hoverable" : ""}`;
      return React.createElement(
        "div",
        {
          key: cardConfig.id,
          className: className,
          style: { visibility: visible ? "visible" : "hidden" },
        },
        visible
          ? this.createCardFromConfig(cardConfig, {
              editorConfig,
              dashboardConfig,
              onDeleteCard,
            })
          : null
      );
    });
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        GridLayout,
        {
          className: "layout desktop-layout",
          layout: cards.map(card => ({
            i: card.id,
            ...card.layout,
          })),
          onLayoutChange: onLayoutChange,
          onDragStart: this.handleDragStart,
          onDragStop: this.handleDragStop,
          onResizeStart: this.handleResizeStart,
          onResizeStop: this.handleResizeStop,
          cols: gridConfig.cols,
          rowHeight: rowHeight,
          isDraggable: editorConfig?.DRAGGABLE || false,
          isResizable: editorConfig?.RESIZABLE || false,
          resizeHandles: ["se", "sw", "ne", "nw"],
          margin: gridConfig.margin,
          containerPadding: gridConfig.containerPadding,
          draggableHandle: editorConfig?.DRAGGABLE ? ".drag-handle" : null,
          useCSSTransforms: true,
          transformScale: 1,
          allowOverlap: false,
          preventCollision: false,
          draggableCancel: "",
        },
        ...cardElements
      ),
      isResizing
        ? React.createElement("div", {
            className: "resizing-overlay desktop-resizing-overlay",
            style: { height: document.documentElement.scrollHeight },
          })
        : null
    );
  }
  render() {
    const { cards } = this.props;
    const { isMobile } = this.state;
    const config = this.props.dashboardConfig;
    if (!config) return null;
    // Check if there is card data
    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      return null; // GridDashboard doesn't handle empty state directly, let parent Dashboard component handle it
    }
    // Route to appropriate render method based on device type
    return isMobile ? this.renderMobileLayout() : this.renderDesktopLayout();
  }
}
window.GridDashboard = GridDashboard;

// Dashboard application main component
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: null,
    };
    this.isInitialized = false;
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.handleAllCardsRenderComplete = this.handleAllCardsRenderComplete.bind(this);
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
  }
  shouldTriggerDataChange(oldCards, newCards) {
    if (oldCards === newCards) return false;
    if (!oldCards && !newCards) return false;
    if (!oldCards || !newCards) return true;
    if (!Array.isArray(oldCards) || !Array.isArray(newCards)) return true;
    if (oldCards.length !== newCards.length) return true;
    try {
      for (let i = 0; i < oldCards.length; i++) {
        const oldCard = oldCards[i];
        const newCard = newCards.find(card => card.id === oldCard.id);
        if (!newCard || oldCard.type !== newCard.type || oldCard.title !== newCard.title) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return true;
    }
  }
  handleAllCardsRenderComplete(renderInfo) {
    const { totalCards, cardsStatus, timestamp } = renderInfo;
    // 从 ErrorCollector 获取更准确的错误统计
    let errorCount = 0;
    let successCount = totalCards;
    let enhancedCardsStatus = cardsStatus;
    if (window.ErrorCollector) {
      // 获取所有卡片ID
      const cardIds = cardsStatus.map(card => card.cardId);
      // 从 ErrorCollector 获取错误统计
      const errorStats = window.ErrorCollector.getCardErrorStats(cardIds);
      // 使用 ErrorCollector 的错误统计
      errorCount = errorStats.cardsWithErrors;
      successCount = errorStats.cardsWithoutErrors;
      // 增强卡片状态信息，添加 ErrorCollector 的错误详情
      enhancedCardsStatus = cardsStatus.map(card => {
        const cardErrors = errorStats.cardErrorMap.get(card.cardId) || [];
        const hasErrorCollectorErrors = cardErrors.length > 0;
        return {
          ...card,
          // 如果 ErrorCollector 中有错误，则标记为错误状态
          status: hasErrorCollectorErrors ? "error" : card.status,
          errorCollectorErrors: cardErrors,
          errorCollectorErrorCount: cardErrors.length,
          // 保留原始渲染状态用于对比
          originalRenderStatus: card.status,
        };
      });
    } else {
      // 如果 ErrorCollector 不可用，使用原始统计
      errorCount = renderInfo.errorCount;
      successCount = renderInfo.successCount;
    }
    // 构建增强的渲染信息
    const enhancedRenderInfo = {
      totalCards,
      successCount,
      errorCount,
      cardsStatus: enhancedCardsStatus,
      timestamp,
    };
    // Trigger callback
    if (this.props.onAllCardsRenderComplete) {
      this.props.onAllCardsRenderComplete(enhancedRenderInfo);
    }
    // Trigger global custom event
    const event = new CustomEvent("DashboardAllCardsRenderComplete", {
      detail: {
        totalCards,
        successCount,
        errorCount,
        timestamp,
        renderDuration: timestamp - (this.dashboardStartTime || timestamp),
      },
    });
    console.log(`[Dashboard] All cards rendering completed - Total: ${totalCards}, Success: ${successCount}, Failed: ${errorCount} (Source: ${window.ErrorCollector ? "ErrorCollector" : "RenderStatus"})`);
    document.dispatchEvent(event);
  }
  // Trigger data change event
  triggerDataChangeEvent(oldCards, newCards, type) {
    // Trigger callback
    if (this.props.onDashboardCardsChange) {
      this.props.onDashboardCardsChange({
        cards: newCards,
        oldCards,
        type,
      });
    }
    // Trigger global event
    const event = new CustomEvent("DashboardCardsChange", {
      detail: {
        cards: newCards,
        oldCards,
        type,
        timestamp: Date.now(),
      },
    });
    document.dispatchEvent(event);
  }
  // Update cards state
  updateCardsState(newCards) {
    const oldCards = this.state.cards;
    // Check if data change event needs to be triggered
    if (this.shouldTriggerDataChange(oldCards, newCards)) {
      this.triggerDataChangeEvent(oldCards, newCards, "cards");
    }
    this.setState({ cards: newCards });
  }
  // Check if layout has changed
  hasLayoutChanged(newLayouts) {
    if (!this.state.cards || !Array.isArray(newLayouts)) {
      return false;
    }
    try {
      return this.state.cards.some(card => {
        const currentLayout = card.layout || {};
        const newLayoutItem = newLayouts.find(layoutItem => layoutItem && layoutItem.i === card.id);
        return newLayoutItem && (currentLayout.x !== newLayoutItem.x || currentLayout.y !== newLayoutItem.y || currentLayout.w !== newLayoutItem.w || currentLayout.h !== newLayoutItem.h);
      });
    } catch (error) {
      console.warn("Error checking layout changes:", error);
      return true;
    }
  }
  // Update card layouts
  updateCardLayouts(layouts) {
    if (!this.state.cards || !Array.isArray(layouts)) {
      return;
    }
    if (!this.hasLayoutChanged(layouts)) {
      return;
    }
    try {
      // Update layout information
      const updatedCards = this.state.cards.map(card => {
        const newLayoutItem = layouts.find(layoutItem => layoutItem && layoutItem.i === card.id);
        if (newLayoutItem) {
          const { i, ...layoutWithoutI } = newLayoutItem;
          return { ...card, layout: layoutWithoutI };
        }
        return card;
      });
      const oldCards = this.state.cards;
      this.setState({ cards: updatedCards });
      // Trigger layout change events
      this.triggerLayoutChangeEvents(oldCards, updatedCards, layouts);
    } catch (error) {
      console.warn("Error updating card layouts:", error);
    }
  }
  // Trigger layout change related events
  triggerLayoutChangeEvents(oldCards, newCards, layouts) {
    // Trigger data change event (layout type)
    this.triggerDataChangeEvent(oldCards, newCards, "layout");
    // Trigger dedicated layout change event
    if (this.props.onLayoutChange) {
      this.props.onLayoutChange({
        layouts,
        type: "layout",
        timestamp: Date.now(),
      });
    }
    const layoutEvent = new CustomEvent("DashboardLayoutChange", {
      detail: {
        layouts,
        cards: newCards,
        type: "layout",
        timestamp: Date.now(),
      },
    });
    document.dispatchEvent(layoutEvent);
  }
  // Handle layout change
  handleLayoutChange(layouts) {
    // layouts parameter is directly a layout array
    if (!Array.isArray(layouts)) {
      console.warn("Invalid layouts parameter:", layouts);
      return;
    }
    this.updateCardLayouts(layouts);
    // Trigger external callback
    if (this.props.onLayoutChange) {
      this.props.onLayoutChange({ layouts });
    }
  }
  // Update state when component receives new props
  componentDidUpdate(prevProps) {
    if (this.hasCardsChanged(prevProps.dashboardCards, this.props.dashboardCards)) {
      this.updateCardsState(this.props.dashboardCards);
    }
  }
  // Check if card data has changed
  hasCardsChanged(prevCards, currentCards) {
    if (prevCards === currentCards) return false;
    if (!prevCards && !currentCards) return false;
    if (!prevCards || !currentCards) return true;
    if (prevCards.length !== currentCards.length) return true;
    // Different references are considered as changes (since we ensure new references are created only when real changes occur)
    return true;
  }
  componentDidMount() {
    // Record dashboard start time
    this.dashboardStartTime = Date.now();
    // Initialize state
    if (!this.isInitialized) {
      this.setState({ cards: this.props.dashboardCards });
      this.isInitialized = true;
    }
  }
  // Delete card
  handleDeleteCard(cardId) {
    const currentCards = this.state.cards || this.props.dashboardCards;
    if (!currentCards) return;
    const updatedCards = currentCards.filter(card => card.id !== cardId);
    // Trigger data change event before updating state
    this.triggerDataChangeEvent(currentCards, updatedCards, "delete");
    // Update local state
    this.setState({ cards: updatedCards });
    // Update global state
    if (this.props.configManager && this.props.configManager.setDashboardCards) {
      this.props.configManager.setDashboardCards(updatedCards);
    }
    // Trigger layout change callback
    if (this.props.onLayoutChange) {
      const layouts = updatedCards.map(card => ({
        i: card.id,
        ...card.layout,
      }));
      this.props.onLayoutChange({ layouts });
    }
  }
  // Get current layout
  getLayouts() {
    if (!this.state.cards) return [];
    return this.state.cards.map(card => ({
      i: card.id,
      ...card.layout,
    }));
  }
  render() {
    // Use card data from component state, fallback to props if not available
    const cards = this.state.cards || this.props.dashboardCards;
    const { editorConfig } = this.props;
    // Check if dashboard is ready
    const isDashboardReady = window.magicDashboard?.ready === true;
    // Check if there is no card data
    const hasCards = cards && Array.isArray(cards) && cards.length > 0;
    // Render dashboard
    return React.createElement(
      "div",
      { className: "dashboard-container" },
      hasCards && isDashboardReady
        ? React.createElement(window.GridDashboard, {
            cards,
            editorConfig,
            dashboardConfig: this.props.dashboardConfig,
            onLayoutChange: this.handleLayoutChange,
            onAllCardsRenderComplete: this.handleAllCardsRenderComplete,
            onDeleteCard: this.handleDeleteCard,
          })
        : React.createElement(window.Empty, {
            dashboardConfig: this.props.dashboardConfig,
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1.5)",
            },
          })
    );
  }
}
window.Dashboard = Dashboard;

// Main application component
function DashboardApp() {
  const { useState } = React;
  const [geoConfig, setGeoConfig] = useState(window.magicDashboard?.geo || []);
  const [editorConfig, setEditorConfig] = useState({
    DRAGGABLE: window.magicDashboard?.draggable || false,
    RESIZABLE: window.magicDashboard?.resizable || false,
    DELETABLE: window.magicDashboard?.deletable || false,
    EXPANDABLE: window.magicDashboard?.expandable || false,
  });
  const [dashboardCards, setDashboardCards] = useState(window.DASHBOARD_CARDS || []);
  const [dashboardConfig, setDashboardConfig] = useState(window.DASHBOARD_CONFIG || {});
  const composeDashboardConfig = React.useMemo(() => {
    return {
      ...window.UTILS.getDashboardDefaultConfig(),
      ...dashboardConfig,
    };
  }, [dashboardConfig]);
  // Simplified configuration manager - only keep 4 setState methods
  const configManager = React.useMemo(() => {
    return {
      setGeoConfig,
      setEditorConfig,
      setDashboardCards,
      setDashboardConfig,
    };
  }, [setGeoConfig, setEditorConfig, setDashboardCards, setDashboardConfig]);
  // Sync state to window global variables
  React.useEffect(() => {
    if (window.magicDashboard) {
      window.magicDashboard.geo = geoConfig;
    }
  }, [geoConfig]);
  React.useEffect(() => {
    if (window.magicDashboard) {
      window.magicDashboard.draggable = editorConfig.DRAGGABLE;
      window.magicDashboard.resizable = editorConfig.RESIZABLE;
      window.magicDashboard.deletable = editorConfig.DELETABLE;
      window.magicDashboard.expandable = editorConfig.EXPANDABLE;
    }
  }, [editorConfig]);
  React.useEffect(() => {
    window.DASHBOARD_CARDS = dashboardCards;
  }, [dashboardCards]);
  React.useEffect(() => {
    window.DASHBOARD_CONFIG = dashboardConfig;
  }, [dashboardConfig]);
  // Expose configuration manager to global and trigger initialization complete event
  React.useEffect(() => {
    window.configManager = configManager;
    // Trigger custom event to notify that configManager is ready
    const configManagerReadyEvent = new CustomEvent("ConfigManagerReady", {
      detail: configManager,
    });
    // Delay triggering event to ensure all initialization is completed
    setTimeout(() => {
      document.dispatchEvent(configManagerReadyEvent);
    }, 100);
  }, [configManager]);
  // Smart sync map configuration (automatically recognize additions and deletions)
  React.useEffect(() => {
    if (window.echarts && window.MapManager) {
      // Asynchronously sync map configuration
      window.MapManager.syncMapsConfig(geoConfig).catch(error => {
        console.error("[App] 地图配置同步失败:", error);
      });
    }
  }, [geoConfig]);
  return React.createElement(window.DashboardFramework.Dashboard, {
    geoConfig,
    editorConfig,
    dashboardCards,
    dashboardConfig: composeDashboardConfig,
    configManager,
    onDashboardCardsChange: data => {
      if (data.cards) {
        setDashboardCards([...data.cards]);
      }
    },
  });
}
window.DashboardApp = DashboardApp;
// Set global framework object
window.DashboardFramework = {
  // Core classes
  Dashboard: window.Dashboard,
  GridDashboard: window.GridDashboard,
  // Data managers
  MapManager: window.MapManager,
  CSVManager: window.CSVManager,
  // Style functions
  applyThemeStyles: window.StyleUtils?.applyThemeStyles,
  formatCSSValue: window.StyleUtils?.formatCSSValue,
};
