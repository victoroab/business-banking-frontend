import React from "react";
import {
  BlueHorizontalCardImage,
  GreenHorizontalCardImage,
} from "../../assets/svg/CardsImage";
import { CardPayment } from "../../assets/svg/CustomSVGs";

interface CardProps {
  type: "physical" | "virtual"; // To determine card background color
  cardNumber: string; // Card number to display
}

const maskCardNumber = (cardNumber: string): string => {
  if (cardNumber.length !== 16) return cardNumber; // Handle invalid card numbers gracefully
  return `${cardNumber.slice(0, 4)} **** **** ${cardNumber.slice(-4)}`;
};

const Card: React.FC<CardProps> = ({ type, cardNumber }) => {
  const CardImage =
    type === "physical" ? GreenHorizontalCardImage : BlueHorizontalCardImage;

  return (
    <div
      style={{ width: "300px", height: "169px" }}
      className="relative rounded-[10px] overflow-hidden"
    >
      <CardImage />
      <div className="absolute inset-0 pl-3 pr-[22px] flex flex-col justify-end text-white">
        <div
          className="flex justify-between items-center"
          style={{ marginBottom: "16px" }}
        >
          <span
            className="text-[20px] font-workSans"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            {maskCardNumber(cardNumber)}
          </span>
          <CardPayment />
        </div>
      </div>
    </div>
  );
};

export default Card;
