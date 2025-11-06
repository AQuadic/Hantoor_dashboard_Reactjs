import CallIcon from "@/components/icons/cars/CallIcon";
import GoogleMapsIcon from "@/components/icons/cars/GoogleMapsIcon";
import WhatsappIcon from "@/components/icons/cars/WhatsappIcon";
import React from "react";

interface AgentCardProps {
  title: string;
  description: string;
  phoneE164?: string | null;
  whatsappE164?: string | null;
  mapLink?: string | null;
}

const AgentCard = ({
  title,
  description,
  phoneE164,
  whatsappE164,
  mapLink,
}: AgentCardProps) => {
  const handlePhoneCall = () => {
    if (phoneE164) {
      globalThis.location.href = `tel:${phoneE164}`;
    }
  };

  const handleWhatsApp = () => {
    if (whatsappE164) {
      const cleanedPhone = whatsappE164.replaceAll(/[^0-9+]/g, "");
      globalThis.open(`https://wa.me/${cleanedPhone}`, "_blank");
    }
  };

  const handleMapOpen = () => {
    if (mapLink) {
      globalThis.open(mapLink, "_blank");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {mapLink && (
          <button
            onClick={handleMapOpen}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Open Google Maps"
          >
            <GoogleMapsIcon />
          </button>
        )}
        {whatsappE164 && (
          <button
            onClick={handleWhatsApp}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Open WhatsApp"
          >
            <WhatsappIcon />
          </button>
        )}
        {phoneE164 && (
          <button
            onClick={handlePhoneCall}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Call Phone"
          >
            <CallIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default AgentCard;
