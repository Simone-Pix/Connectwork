import PropertyCard from "./PropertyCard";

function PropertyList({ properties }) {
  if (!properties || properties.length === 0) {
    return <div className="no-results-search">Nessuna proprietà trovata.</div>;
  }

  return (
    <div className="property-list-search">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}

export default PropertyList;