
export interface Rental {
    id: string;
    trailerName: string;
    trailerImage: string;
    startDate: string;
    endDate: string | null;
    status: 'Active' | 'Completed' | 'Upcoming';
    price: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    rentals: Rental[];
}

export const MOCK_USER: User = {
    id: 'u1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    rentals: [
        {
            id: 'r1',
            trailerName: '53\' Dry Van Trailer',
            trailerImage: 'https://images.unsplash.com/photo-1586191582116-2bad988350fb?auto=format&fit=crop&q=80',
            startDate: '2023-10-01',
            endDate: null,
            status: 'Active',
            price: '$450/mo'
        },
        {
            id: 'r2',
            trailerName: 'Reefer Trailer 2020',
            trailerImage: 'https://images.unsplash.com/photo-1629813523412-25e11d041358?auto=format&fit=crop&q=80',
            startDate: '2023-08-15',
            endDate: '2023-09-15',
            status: 'Completed',
            price: '$600/mo'
        },
        {
            id: 'r3',
            trailerName: 'Flatbed Trailer XL',
            trailerImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80',
            startDate: '2023-11-20',
            endDate: null,
            status: 'Upcoming',
            price: '$500/mo'
        }
    ]
};
