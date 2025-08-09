interface CardProps {
  type?: string;
  title?: string;
  link: string;
  id?: string;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export const Card = ({ type, link }: CardProps) => {
  const renderEmbed = () => {
    switch (type?.toLowerCase()) {
      case "facebook":
        return (
          <iframe
            src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
              link
            )}&width=260`}
            className="w-full h-full"
            style={{ border: "none", overflow: "hidden" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );

      case "instagram":
        return (
          <iframe
            src={`https://www.instagram.com/p/${extractInstagramId(
              link
            )}/embed`}
            className="w-full h-full "
            style={{ border: "none", overflow: "hidden" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );

      case "linkedin":
        return (
          <iframe
            src={link}
            className="w-full h-full"
            style={{ border: "none", overflow: "hidden" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );

      case "youtube": {
        const id = extractYouTubeId(link);
        return id ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            className="w-full h-full mt-18"
            style={{ border: "none", overflow: "hidden" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Invalid YouTube URL</p>
        );
      }

      default:
        return <p>Unsupported embed type</p>;
    }
  };

  return (
    <div
      className="flex mb-8 items-center justify-center h-60 w-full rounded-xl bg-gray-50 border   shadow-inner overflow-hidden"
      style={{
        minHeight: "260px",

        maxHeight: "260px",
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        {renderEmbed()}
      </div>
    </div>
  );
};

// Helper function for Instagram
function extractInstagramId(url: string): string | null {
  const match = url.match(/instagram\.com\/p\/([^/]+)/);
  return match ? match[1] : null;
}
