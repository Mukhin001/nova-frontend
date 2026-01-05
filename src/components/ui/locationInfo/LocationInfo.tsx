interface LocationInfoProps {
  city: string;
  country: string | undefined;
  isLoading: boolean;
  isError: boolean;
}

const LocationInfo = ({
  city,
  country,
  isLoading,
  isError,
}: LocationInfoProps) => {
  if (isLoading) return <p>Detecting location...</p>;
  if (isError) return <p>Error location...</p>;

  return (
    <div>
      <p>Country: {country?.toLocaleUpperCase()}</p>
      <p>City: {city}</p>
    </div>
  );
};

export default LocationInfo;
