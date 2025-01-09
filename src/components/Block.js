const Block = ({ block, blockImage, style }) => {
  return (
    <div
      className="block"
      style={{
        position: 'absolute',
        top: block.top,
        left: block.left,
        ...style, // Apply the passed style
      }}
    >
      <img src={blockImage} alt={block.label} />
      {/* Remove the block-label div */}
    </div>
  );
};

export default Block;