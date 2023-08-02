
export type TImageData = {
    href: string,
    data: [TDataObject],
    links: [TImageItem]
}

export type TImageItem = {
    href: string,
    rel: string,
    render: string
}

type TDataObject = {
    center: string,
    date_created: string,
    description?: string,
    description_508?: string,
    keywords?: [],
    media_type?: string,
    nasa_id: string,
    secondary_creator?: string,
    title: string
}

export type TPicOfTheDay = {
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    title: string,
    url: string,
    prevUrl: string
}

export type TGLobalError = {
    error: string,
    page?: string
}