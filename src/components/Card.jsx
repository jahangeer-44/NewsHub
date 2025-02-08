const Card = ({ data }) => {
    if (!Array.isArray(data)) {
      return <div></div>;
    }
  
    return (
        
      <div className="flex justify-center flex-wrap gap-10">
        {data.map((curItem, index) => (
          <div
            key={index}
            className="w-80 bg-white shadow-md border border-gray-200 rounded-md mt-5"
          >
            <img
              src={curItem.urlToImage}
              alt={curItem.title}
              className="w-full h-44 object-cover rounded-t-md"
            />
            <div className="p-3">
              <a className="font-semibold text-lg">{curItem.title}</a>
              <p className="text-gray-600 text-sm mt-1">{curItem.description}</p>
              <a href={curItem.url}>
                <button className="bg-red-400 text-white text-sm px-4 py-1 rounded-md mt-3 hover:bg-red-600">
                  Read me
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Card;
  