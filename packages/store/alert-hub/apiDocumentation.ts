import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { ApiDocumentationInterface } from '../interface';
import { envConfig } from '@core/envconfig';
import { useSlug } from '../common';
import { giveMeApiBody } from '../utils';

export const useApiDocumentation = create<ApiDocumentationInterface>((set, get) => ({
    apiBody: giveMeApiBody(),
    apiBodyMessage: '',
    apiBodyError: false,


    handleChangeCallback: (key: string, value: string, apiBody: any) => {
        // if (Object.values(apiBody.email_body)) {
        //     set((state) => ({ apiBody: { ...state.apiBody, [key]: [value] } }));
        // } else {
            set((state) => ({ apiBody: { ...state.apiBody, [key]: value } }));

        // }
    },

    requestBodyAPI: () => {
        const { apiBody } = get()
        const payload = apiBody

    // Function to recursively filter out empty values from arrays
    const filterNonEmpty = (value) => {
        if (Array.isArray(value)) {
            // Recursively filter array elements
            const filteredArray = value.map(filterNonEmpty).filter(Boolean);
            // Exclude empty arrays
            return filteredArray.length > 0 ? filteredArray : undefined;
        } else if (value !== undefined && value !== null && value !== '' && value?.length >= 1) {
            // Exclude undefined, null, and empty string values
            return value;
        }
        // Exclude other false values
        return undefined;
    };

    // Recursively filter out empty values from the payload
    const filteredPayload = Object.fromEntries(
        Object.entries(payload).map(([key, value]) => [key, filterNonEmpty(value)])
    );
    
        const slugId = useSlug.getState().slugs.ALERTSHUB;
        httpRequest('post', `${envConfig.api_url}/alertshub/sendmessage`,
            filteredPayload,
            true, 
            undefined, {
            headers: {
                slug: slugId,
            },
        })
            .then((response) => {
                set((state) => ({ apiBodyMessage: response?.data?.message }));
                set((state) => ({ apiBodyError: false }))
            })
            .catch((err) => {
                set((state) => ({ apiBodyMessage: err?.response?.data?.message }));
                set((state) => ({ apiBodyError: true }))

                // enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
            })
            .finally(() => {
                console.log();
            });
        return false;
    }
}));
