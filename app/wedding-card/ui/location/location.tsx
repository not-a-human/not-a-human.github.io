"use client";

import { useState } from "react";
import styles from "./location.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { FaMapMarkerAlt, FaRoute } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { GoCopy } from "react-icons/go";

interface LocationProps {
  isOpen: boolean;
  onClose: () => void;
}

// Wedding venue address
const venueAddress = {
  name: "Rumah Mara Kampung Baru Parit Tinggi",
  address:
    "No 23, Rumah Mara Kampung Baru Parit Tinggi, Kuala Pilah, 72000, Kuala Pilah, Negeri Sembilan",
  coordinates: {
    lat: 2.7297, // Approximate coordinates for Kuala Pilah
    lng: 102.2492,
  },
  googleMapsQuery:
    "No 23, Rumah Mara Kampung Baru Parit Tinggi, Kuala Pilah, 72000, Negeri Sembilan",
  wazeQuery:
    "No 23, Rumah Mara Kampung Baru Parit Tinggi, Kuala Pilah, 72000, Negeri Sembilan",
};

export function Location({ isOpen, onClose }: LocationProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadingApp, setLoadingApp] = useState<string | null>(null);

  if (!isOpen) return null;

  // Generate Google Maps embed URL
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"
  }&q=${encodeURIComponent(venueAddress.googleMapsQuery)}&zoom=15`;

  // Fallback map URL (without API key)
  const fallbackMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8!2d102.2492!3d2.7297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwNDMnNDcuMCJOIDEwMsKwMTQnNTcuMCJF!5e0!3m2!1sen!2smy!4v1234567890123!5m2!1sen!2smy`;

  const handleGoogleMaps = () => {
    setLoadingApp("googlemaps");

    // Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      venueAddress.googleMapsQuery
    )}`;

    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setLoadingApp(null);
    }, 1000);
  };

  const handleWaze = () => {
    setLoadingApp("waze");

    // Waze URL
    const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
      venueAddress.wazeQuery
    )}&navigate=yes`;

    window.open(wazeUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setLoadingApp(null);
    }, 1000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(venueAddress.address);
    // You could add a toast notification here
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h2 className={styles.popupTitle}>Location</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <IoCloseOutline />
          </button>
        </div>

        <div className={styles.popupBody}>
          {/* Venue Information */}
          <div className={styles.venueInfo}>
            <div className={styles.venueHeader}>
              <FaMapMarkerAlt className={styles.venueIcon} />
              <div>
                <h3 className={styles.venueName}>{venueAddress.name}</h3>
                <p className={styles.venueAddress}>{venueAddress.address}</p>
              </div>
            </div>

            <button
              className={styles.copyButton}
              onClick={handleCopyAddress}
              title="Copy address"
            >
              <GoCopy /> Copy Address
            </button>
          </div>

          {/* Google Map Embed */}
          <div className={styles.mapContainer}>
            {!mapLoaded && (
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapLoader}>
                  <FaMapMarkerAlt className={styles.mapLoaderIcon} />
                  <p>Loading map...</p>
                </div>
              </div>
            )}

            <iframe
              src={fallbackMapUrl}
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Location"
              onLoad={() => setMapLoaded(true)}
              className={mapLoaded ? styles.mapVisible : styles.mapHidden}
            />
          </div>

          {/* Navigation Buttons */}
          <div className={styles.navigationSection}>
            <h4 className={styles.navigationTitle}>Get Directions</h4>

            <div className={styles.navigationButtons}>
              <button
                className={`${styles.navButton} ${styles.googleMapsButton}`}
                onClick={handleGoogleMaps}
                disabled={loadingApp === "googlemaps"}
              >
                <SiGooglemaps className={styles.navButtonIcon} />
                <span>Google Maps</span>
                {loadingApp === "googlemaps" && (
                  <div className={styles.buttonSpinner}></div>
                )}
              </button>

              <button
                className={`${styles.navButton} ${styles.wazeButton}`}
                onClick={handleWaze}
                disabled={loadingApp === "waze"}
              >
                <FaRoute className={styles.navButtonIcon} />
                <span>Waze</span>
                {loadingApp === "waze" && (
                  <div className={styles.buttonSpinner}></div>
                )}
              </button>
            </div>
          </div>

          {/* Additional Info */}
          {/* <div className={styles.additionalInfo}>
            <div className={styles.infoCard}>
              <h4>Event Details</h4>
              <p>
                <strong>Date:</strong> Sunday, November 9, 2025
              </p>
              <p>
                <strong>Time:</strong> 5:00 PM - 6:30 PM
              </p>
              <p>
                <strong>Event:</strong> Akad Nikah & High Tea
              </p>
            </div>

            <div className={styles.infoCard}>
              <h4>Parking</h4>
              <p>Parking available on-site</p>
              <p>Please follow the signs and staff directions</p>
            </div>
          </div>

          <div className={styles.helpText}>
            <p>
              Having trouble finding us? Please call the family for assistance.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
