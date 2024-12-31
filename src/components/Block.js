// Block.js

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
      <div className="block-label">{block.label}</div> {/* Add label here */}
    </div>
  );
};

export default Block;


