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
        // if (Object.values(apiBody)) {
        //     set((state) => ({ apiBody: { ...state.apiBody, [key]: [value] } }));
        // } else {
            set((state) => ({ apiBody: { ...state.apiBody, [key]: value } }));

        // }
    },

    requestBodyAPI: () => {
        const { apiBody } = get()
        const payload = apiBody
        const slugId = useSlug.getState().slugs.ALERTSHUB;
        httpRequest('post', `${envConfig.api_url}/alertshub/sendmessage`,
            payload,
            true, undefined, {
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
