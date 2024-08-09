import React, { useState, useEffect } from "react";
import Image, {ImageProps} from "next/image";

import fallbackImage from '../../../public/images/placeholder-image.png';

interface ImageWithFallbackProps extends ImageProps {
    fallback?: ImageProps['src']
}
  
const ImageWithFallback = ({
    fallback = fallbackImage,
    alt,
    src,
    ...props
}: ImageWithFallbackProps) => {
const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
> | null>(null)

useEffect(() => {
    setError(null)
}, [src])

return (
    <Image
    alt={alt}
    onError={setError}
    src={error ? fallbackImage : src}
    {...props}
    />
)
}

export default ImageWithFallback;