import PropertyCard from "./PropertyCard";

function PropertyList({ properties, images }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="bg-white rounded-xl p-10 text-center text-gray-600 shadow-sm">
        Nessuna proprietà trovata.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} images={images} />
      ))}
    </div>
  );
}

export default PropertyList;