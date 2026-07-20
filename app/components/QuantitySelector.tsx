'use client';

interface QuantitySelectorProps {
  quantity: number;
  stockQuantity: number;
  disabled: boolean;
  onChange: (value: number) => void;
}

export default function QuantitySelector({
  quantity,
  stockQuantity,
  disabled,
  onChange,
}: QuantitySelectorProps) {
  const maxLimit = stockQuantity || 1;

  const handleDecrease = () => {
    if (disabled || quantity <= 1) return;
    onChange(quantity - 1);
  };

  const handleIncrease = () => {
    if (disabled || quantity >= maxLimit) return;
    onChange(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const value = e.target.value;
    
    // Allow empty string temporarily while typing, but handle on blur
    if (value === '') {
      onChange(1);
      return;
    }

    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      // Clamp value
      const clamped = Math.max(1, Math.min(parsed, maxLimit));
      onChange(clamped);
    }
  };

  const handleBlur = () => {
    if (disabled) return;
    // Ensure value is valid
    if (quantity < 1) {
      onChange(1);
    } else if (quantity > maxLimit) {
      onChange(maxLimit);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="quantity-input" className="text-sm font-semibold text-gray-700">
        Quantity
      </label>
      <div className="flex items-center w-36 h-12 border border-[#9F9F9F] rounded-lg overflow-hidden bg-white">
        {/* Decrease button */}
        <button
          type="button"
          onClick={handleDecrease}
          disabled={disabled || quantity <= 1}
          aria-label="Decrease quantity"
          className={`w-12 h-full flex items-center justify-center font-medium text-lg focus:outline-none transition-colors ${
            disabled || quantity <= 1
              ? 'text-gray-300 cursor-not-allowed bg-gray-50'
              : 'text-gray-600 hover:bg-gray-100 hover:text-black'
          }`}
        >
          &minus;
        </button>

        {/* Input field */}
        <input
          id="quantity-input"
          type="number"
          min="1"
          max={maxLimit}
          value={quantity}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={disabled}
          className="w-12 h-full text-center font-semibold text-base bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-gray-800"
        />

        {/* Increase button */}
        <button
          type="button"
          onClick={handleIncrease}
          disabled={disabled || quantity >= maxLimit}
          aria-label="Increase quantity"
          className={`w-12 h-full flex items-center justify-center font-medium text-lg focus:outline-none transition-colors ${
            disabled || quantity >= maxLimit
              ? 'text-gray-300 cursor-not-allowed bg-gray-50'
              : 'text-gray-600 hover:bg-gray-100 hover:text-black'
          }`}
        >
          &#43;
        </button>
      </div>
      {stockQuantity > 0 && stockQuantity <= 5 && (
        <p className="text-xs font-semibold text-red-500 mt-1">
          Only {stockQuantity} items left in stock!
        </p>
      )}
    </div>
  );
}
