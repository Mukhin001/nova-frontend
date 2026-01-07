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
      <h3>Country: {country?.toLocaleUpperCase()}</h3>
      <h3>City: {city}</h3>
    </div>
  );
};

export default LocationInfo;
