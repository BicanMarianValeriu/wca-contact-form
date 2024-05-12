/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************************************!*\
  !*** ./inc/support/modules/contactform/src/js/admin.js ***!
  \*********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @package: 	WeCodeArt CF7 Extension
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.wecodeart.com/
 * @version:	1.0.0
 */
const {
  i18n: {
    __,
    sprintf
  },
  hooks: {
    addFilter
  },
  components: {
    Placeholder,
    DropdownMenu,
    ToggleControl,
    SelectControl,
    Card,
    CardHeader,
    CardBody,
    Dashicon,
    Spinner,
    Button
  },
  element: {
    useState,
    useEffect
  }
} = wp;
addFilter('wecodeart.admin.tabs.plugins', 'wecodeart/cf7/admin/panel', optionsPanel);
function optionsPanel(panels) {
  return [...panels, {
    name: 'wecodeart',
    title: __('Contact Form 7', 'wecodeart'),
    render: props => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Options, {
      ...props
    })
  }];
}
const Options = props => {
  const {
    settings,
    saveSettings,
    isRequesting,
    createNotice
  } = props;
  if (isRequesting || !settings) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Placeholder, {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, null),
      label: __('Loading', 'wecodeart'),
      instructions: __('Please wait, loading settings...', 'wecodeart')
    });
  }
  const [loading, setLoading] = useState(null);
  const apiOptions = (({
    contact_form_7
  }) => contact_form_7)(settings);
  const [formData, setFormData] = useState(apiOptions);
  const handleNotice = () => {
    setLoading(false);
    return createNotice('success', __('Settings saved.', 'wecodeart'));
  };
  const getHelpText = type => {
    let text = '',
      status = '';
    switch (type) {
      case 'assets':
        status = formData?.clean_assets ? __('when the content has a form', 'wecodeart') : __('on every page', 'wecodeart');
        text = sprintf(__('Contact Form 7 assets are loaded %s.', 'wecodeart'), status);
        break;
      case 'JS':
        status = formData?.remove_js ? __('removed', 'wecodeart') : __('loaded', 'wecodeart');
        text = sprintf(__('Default Contact Form 7 plugin JS will be %s.', 'wecodeart'), status);
        break;
      case 'CSS':
        status = formData?.remove_css ? __('removed', 'wecodeart') : __('loaded', 'wecodeart');
        text = sprintf(__('Default Contact Form 7 plugin CSS will be %s.', 'wecodeart'), status);
        break;
      case 'P':
        status = formData?.remove_autop ? __('does not', 'wecodeart') : __('does', 'wecodeart');
        text = sprintf(__('Contact Form 7 %s apply the "autop" filter to the form content.', 'wecodeart'), status);
        break;
      case 'feedback':
        text = __('Select submission feedback type.', 'wecodeart');
        break;
      default:
    }
    return text;
  };
  const assetsControl = !(formData?.remove_js && formData.remove_css);
  useEffect(() => {
    if (!assetsControl) {
      setFormData({
        ...formData,
        clean_assets: false
      });
    }
  }, [assetsControl]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid",
    style: {
      '--wca--columns': 2
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "g-col-2 g-col-lg-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    className: "border shadow-none h-100"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "text-uppercase fw-medium m-0"
  }, __('Optimization', 'wecodeart'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, __('Remove JS?', 'wecodeart')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
      label: __('More Information', 'wecodeart'),
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        icon: "info",
        style: {
          color: 'var(--wca--header--color)'
        }
      }),
      toggleProps: {
        style: {
          height: 'initial',
          minWidth: 'initial',
          padding: 0
        }
      },
      popoverProps: {
        focusOnMount: 'container',
        position: 'bottom',
        noArrow: false
      }
    }, () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      style: {
        minWidth: 250,
        margin: 0
      }
    }, __('Removing JS will cause the form submission to hard refresh the page!', 'wecodeart'))))),
    help: getHelpText('JS'),
    checked: formData?.remove_js,
    onChange: remove_js => setFormData({
      ...formData,
      remove_js,
      feedback: ''
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: __('Remove CSS?', 'wecodeart'),
    help: getHelpText('CSS'),
    checked: formData?.remove_css,
    onChange: remove_css => setFormData({
      ...formData,
      remove_css
    })
  }), assetsControl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: __('Optimize assets loading?', 'wecodeart'),
    help: getHelpText('assets'),
    checked: formData?.clean_assets,
    onChange: clean_assets => setFormData({
      ...formData,
      clean_assets
    })
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "g-col-2 g-col-lg-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    className: "border shadow-none h-100"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "text-uppercase fw-medium m-0"
  }, __('Functionality', 'wecodeart'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, __('Remove "autop" filter?', 'wecodeart')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
      label: __('More Information', 'wecodeart'),
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        icon: "info",
        style: {
          color: 'var(--wca--header--color)'
        }
      }),
      toggleProps: {
        style: {
          height: 'initial',
          minWidth: 'initial',
          padding: 0
        }
      },
      popoverProps: {
        focusOnMount: 'container',
        position: 'bottom',
        noArrow: false
      }
    }, () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      style: {
        minWidth: 250,
        margin: 0
      }
    }, __('Removing this filter will alow the use of HTML tags in your forms.', 'wecodeart'))))),
    help: getHelpText('P'),
    checked: formData?.remove_autop,
    onChange: remove_autop => setFormData({
      ...formData,
      remove_autop
    })
  }), !formData?.remove_js && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: __('Feedback type', 'wecodeart'),
    value: formData?.feedback,
    options: [{
      label: __('Default', 'wecodeart'),
      value: ''
    }, {
      label: __('Toast', 'wecodeart'),
      value: 'toast'
    }
    /* { label: __('Modal', 'wecodeart'), value: 'modal' }, */],
    onChange: feedback => setFormData({
      ...formData,
      feedback,
      feedback_position: ''
    }),
    help: getHelpText('feedback')
  }), formData?.feedback === 'modal' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: __('Feedback position', 'wecodeart'),
    value: formData?.feedback_position,
    options: [{
      label: __('Top', 'wecodeart'),
      value: 'top'
    }, {
      label: __('Middle', 'wecodeart'),
      value: 'centered'
    }],
    onChange: feedback_position => setFormData({
      ...formData,
      feedback_position
    })
  })))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", {
    style: {
      margin: '20px 0'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button",
    isPrimary: true,
    isLarge: true,
    icon: loading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, null),
    onClick: () => {
      setLoading(true);
      saveSettings({
        contact_form_7: formData
      }, handleNotice);
    },
    disabled: loading
  }, loading ? '' : __('Save', 'wecodeart')));
};
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map