import { router } from '@inertiajs/react';
import { AppThunk } from '../../app/store';
import { resetBuilder } from './form-builder-slice';

class FormBuilderThunk {
    sendFormAsync(): AppThunk {
        return async (dispatch, getState) => {
            const state = getState();
            const { formBuilder } = state;

            if (formBuilder.formTitle.trim() === '' && formBuilder.showFormTitleInput) {
                alert('Form title is required.');
                return;
            }

            if (formBuilder.newElements.length === 0) {
                alert('You must add at least one field.');
                return;
            }

            try {
                router.post(
                    '/forms',
                    {
                        title: formBuilder.formTitle,
                        bg_color: formBuilder.bGColor,
                        description: '-',
                    },
                    {
                        onSuccess: (response) => {
                            const formId = response.props?.form_id;
                            console.log(formId);
                            if (formId) {
                                dispatch(formBuilderThunk.submitFieldsAsync(formId as number));
                            }
                        },
                        onError: (error) => {
                            console.log('Error submitting fields:', error);
                            alert('Failed to publish form.');
                        },
                    },
                );
            } catch (error) {
                console.log('Error submitting fields:', error);
            }
        };
    }

    submitFieldsAsync(formId: number): AppThunk {
        return async (dispatch, getState) => {
            const state = getState();
            const { formBuilder } = state;

            try {
                router.post(
                    `/forms/${formId}/fields`,
                    {
                        fields: formBuilder.newElements.map((field, index) => ({
                            form_id: formId,
                            label: field.label,
                            type: field.type ?? '',
                            required: field.required,
                            order: index,
                            options: field.options ?? [],
                            placeholder: field.placeholder,
                        })),
                    },
                    {
                        onSuccess: () => {
                            alert('Form successfully published with all fields!');
                            dispatch(resetBuilder());
                        },
                        onError: () => {
                            alert('Failed to send fields.');
                        },
                    },
                );
            } catch (error) {}
        };
    }
}

export const formBuilderThunk = new FormBuilderThunk();
