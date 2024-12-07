import React, { useState } from "react";
import "./style.css";
import { ActionsIcon, ToolTipIcon } from "../../assets/svg/CustomSVGs";
import { conversionRates, financialData, financialItems } from "../../utils";
import { Currency } from "../../interfaces/Global";

const Analysis: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>("NGN");

  const convertToCurrency = (amount: number) => {
    const rate = conversionRates[currency];
    return (amount / rate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="dashboard-container">
      <div className="topButtons">
        <div className="currency-selector">
          <button
            className={`currency-button ${currency === "NGN" ? "active" : ""}`}
            onClick={() => setCurrency("NGN")}
          >
            NGN
          </button>
          <button
            className={`currency-button ${currency === "GBP" ? "active" : ""}`}
            onClick={() => setCurrency("GBP")}
          >
            GBP
          </button>
          <button
            className={`currency-button ${currency === "USD" ? "active" : ""}`}
            onClick={() => setCurrency("USD")}
          >
            USD
          </button>
          <button
            className={`currency-button ${currency === "CAD" ? "active" : ""}`}
            onClick={() => setCurrency("CAD")}
          >
            CAD
          </button>
        </div>

        <div className="action-buttons">
          <button className="primary-btn">Add Money</button>
          <button className="secondary-btn">Send Money</button>
          <button className="secondary-btn">
            <ActionsIcon />
          </button>
        </div>
      </div>

      <div className="financial-info">
        {financialItems.map((item) => (
          <div key={item.key} className="info-box">
            <div className="info-label-wrapper">
              <p className="info-label">{item.label}</p>
              <span className="tooltip-icon">
                <ToolTipIcon />
              </span>
              <div className="tooltip-text">{item.toolTip}</div>{" "}
            </div>
            <h2 className="info-value">
              {item.isCurrency
                ? `${currency} ${convertToCurrency(
                    financialData[item.key as keyof typeof financialData]
                  )}`
                : financialData[item.key as keyof typeof financialData]}
            </h2>
            <p className={`info-change ${item.changeType}`}>
              {<item.change />} 20% Past Day
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analysis;
