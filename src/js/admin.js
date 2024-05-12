/**
 * @package: 	WeCodeArt CF7 Extension
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.wecodeart.com/
 * @version:	1.0.0
 */
const {
    i18n: {
        __,
        sprintf
    },
    hooks: {
        addFilter
    },
    components: {
        Placeholder,
        DropdownMenu,
        ToggleControl,
        SelectControl,
        Card,
        CardHeader,
        CardBody,
        Dashicon,
        Spinner,
        Button,
    },
    element: {
        useState,
        useEffect
    }
} = wp;

addFilter('wecodeart.admin.tabs.plugins', 'wecodeart/cf7/admin/panel', optionsPanel);
function optionsPanel(panels) {
    return [...panels, {
        name: 'wecodeart',
        title: __('Contact Form 7', 'wecodeart'),
        render: (props) => <Options {...props} />
    }];
}

const Options = (props) => {
    const { settings, saveSettings, isRequesting, createNotice } = props;

    if (isRequesting || !settings) {
        return <Placeholder {...{
            icon: <Spinner />,
            label: __('Loading', 'wecodeart'),
            instructions: __('Please wait, loading settings...', 'wecodeart')
        }} />;
    }

    const [loading, setLoading] = useState(null);
    const apiOptions = (({ contact_form_7 }) => (contact_form_7))(settings);
    const [formData, setFormData] = useState(apiOptions);

    const handleNotice = () => {
        setLoading(false);
        return createNotice('success', __('Settings saved.', 'wecodeart'));
    };

    const getHelpText = (type) => {
        let text = '', status = '';

        switch (type) {
            case 'assets':
                status = formData?.clean_assets ? __('when the content has a form', 'wecodeart') : __('on every page', 'wecodeart');
                text = sprintf(__('Contact Form 7 assets are loaded %s.', 'wecodeart'), status);
                break;
            case 'JS':
                status = formData?.remove_js ? __('removed', 'wecodeart') : __('loaded', 'wecodeart');
                text = sprintf(__('Default Contact Form 7 plugin JS will be %s.', 'wecodeart'), status);
                break;
            case 'CSS':
                status = formData?.remove_css ? __('removed', 'wecodeart') : __('loaded', 'wecodeart');
                text = sprintf(__('Default Contact Form 7 plugin CSS will be %s.', 'wecodeart'), status);
                break;
            case 'P':
                status = formData?.remove_autop ? __('does not', 'wecodeart') : __('does', 'wecodeart');
                text = sprintf(__('Contact Form 7 %s apply the "autop" filter to the form content.', 'wecodeart'), status);
                break;
            case 'feedback':
                text = __('Select submission feedback type.', 'wecodeart');
                break;
            default:
        }

        return text;
    };

    const assetsControl = !(formData?.remove_js && formData.remove_css);

    useEffect(() => {
        if (!assetsControl) {
            setFormData({ ...formData, clean_assets: false });
        }
    }, [assetsControl]);

    return (
        <>
            <div className="grid" style={{ '--wca--columns': 2 }}>
                <div className="g-col-2 g-col-lg-1">
                    <Card className="border shadow-none h-100">
                        <CardHeader>
                            <h5 className="text-uppercase fw-medium m-0">{__('Optimization', 'wecodeart')}</h5>
                        </CardHeader>
                        <CardBody>
                            <ToggleControl
                                label={<>
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>{__('Remove JS?', 'wecodeart')}</span>
                                        <DropdownMenu
                                            label={__('More Information', 'wecodeart')}
                                            icon={<Dashicon icon="info" style={{ color: 'var(--wca--header--color)' }} />}
                                            toggleProps={{
                                                style: {
                                                    height: 'initial',
                                                    minWidth: 'initial',
                                                    padding: 0
                                                }
                                            }}
                                            popoverProps={{
                                                focusOnMount: 'container',
                                                position: 'bottom',
                                                noArrow: false,
                                            }}
                                        >
                                            {() => (
                                                <p style={{ minWidth: 250, margin: 0 }}>
                                                    {__('Removing JS will cause the form submission to hard refresh the page!', 'wecodeart')}
                                                </p>
                                            )}
                                        </DropdownMenu>
                                    </span>
                                </>}
                                help={getHelpText('JS')}
                                checked={formData?.remove_js}
                                onChange={remove_js => setFormData({ ...formData, remove_js, feedback: '' })}
                            />
                            <ToggleControl
                                label={__('Remove CSS?', 'wecodeart')}
                                help={getHelpText('CSS')}
                                checked={formData?.remove_css}
                                onChange={remove_css => setFormData({ ...formData, remove_css })}
                            />
                            {assetsControl && (
                                <ToggleControl
                                    label={__('Optimize assets loading?', 'wecodeart')}
                                    help={getHelpText('assets')}
                                    checked={formData?.clean_assets}
                                    onChange={clean_assets => setFormData({ ...formData, clean_assets })}
                                />
                            )}
                        </CardBody>
                    </Card>
                </div>
                <div className="g-col-2 g-col-lg-1">
                    <Card className="border shadow-none h-100">
                        <CardHeader>
                            <h5 className="text-uppercase fw-medium m-0">{__('Functionality', 'wecodeart')}</h5>
                        </CardHeader>
                        <CardBody>
                            <ToggleControl
                                label={<>
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>{__('Remove "autop" filter?', 'wecodeart')}</span>
                                        <DropdownMenu
                                            label={__('More Information', 'wecodeart')}
                                            icon={<Dashicon icon="info" style={{ color: 'var(--wca--header--color)' }} />}
                                            toggleProps={{
                                                style: {
                                                    height: 'initial',
                                                    minWidth: 'initial',
                                                    padding: 0
                                                }
                                            }}
                                            popoverProps={{
                                                focusOnMount: 'container',
                                                position: 'bottom',
                                                noArrow: false,
                                            }}
                                        >
                                            {() => (
                                                <p style={{ minWidth: 250, margin: 0 }}>
                                                    {__('Removing this filter will alow the use of HTML tags in your forms.', 'wecodeart')}
                                                </p>
                                            )}
                                        </DropdownMenu>
                                    </span>
                                </>}
                                help={getHelpText('P')}
                                checked={formData?.remove_autop}
                                onChange={remove_autop => setFormData({ ...formData, remove_autop })}
                            />
                            {!formData?.remove_js && <>
                                <SelectControl
                                    label={__('Feedback type', 'wecodeart')}
                                    value={formData?.feedback}
                                    options={[
                                        { label: __('Default', 'wecodeart'), value: '' },
                                        { label: __('Toast', 'wecodeart'), value: 'toast' },
                                        /* { label: __('Modal', 'wecodeart'), value: 'modal' }, */
                                    ]}
                                    onChange={(feedback) => setFormData({ ...formData, feedback, feedback_position: '' })}
                                    help={getHelpText('feedback')}
                                />
                                {formData?.feedback === 'modal' && <SelectControl
                                    label={__('Feedback position', 'wecodeart')}
                                    value={formData?.feedback_position}
                                    options={[
                                        { label: __('Top', 'wecodeart'), value: 'top' },
                                        { label: __('Middle', 'wecodeart'), value: 'centered' },
                                    ]}
                                    onChange={(feedback_position) => setFormData({ ...formData, feedback_position })}
                                />}
                            </>}
                        </CardBody>
                    </Card>
                </div>
            </div>
            <hr style={{ margin: '20px 0' }} />
            <Button
                className="button"
                isPrimary
                isLarge
                icon={loading && <Spinner />}
                onClick={() => {
                    setLoading(true);
                    saveSettings({ contact_form_7: formData }, handleNotice);
                }}
                {...{ disabled: loading }}
            >
                {loading ? '' : __('Save', 'wecodeart')}
            </Button>
        </>
    );
};