export const prepareImgURL = ({ format = 'webp', auto = 'webp', url, width = null, height = null }) => {
    if (!url) return null;

    const newUrl = new URL(url);
    newUrl.searchParams.set('format', format);
    newUrl.searchParams.set('auto', auto);
    width && newUrl.searchParams.set('width', width);
    height && newUrl.searchParams.set('height', height);

    return newUrl;
}

export const getImageURL = (obj) => obj?.edges?.[0]?.node?.url || '';