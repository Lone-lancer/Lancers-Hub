import { Link } from 'react-router-dom';
import Select, { components } from 'react-select';
import classNames from 'classnames';

// utils
import { groupByFields } from '../../../utils';


/*
 * get options
 */
const optionGetter = (option) => {
    switch (option.type) {
        case 'report':
        case 'help':
        case 'settings':
            return (
                <Link to="#" className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
                    <i className={`${option.icon} text-gray-500 mr-3 text-lg`}></i>
                    <span className="text-gray-700">{option.label}</span>
                </Link>
            );
        case 'title':
            return (
                <div className="px-4 py-2 bg-gray-50">
                    <h6 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Users</h6>
                </div>
            );
        case 'users':
            return (
                <Link to="#" className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
                    <img
                        src={option.userDetails!.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="ml-3">
                        <h5 className="text-sm font-medium text-gray-900">
                            {option.userDetails!.firstname} {option.userDetails!.lastname}
                        </h5>
                        <span className="text-xs text-gray-500">{option.userDetails!.position}</span>
                    </div>
                </Link>
            );
        default:
            return;
    }
};

/*
 * filter options
 */
const formateOptions = (options: SearchOptions[]) => {
    const grouppedData = groupByFields(options, (item: SearchOptions) => {
        return [item.type];
    });

    let formattedOptions = [];
    let count = 0;

    for (let i = 0; i < grouppedData.length; i++) {
        for (let j = 0; j < grouppedData[i].length; j++) {
            if (grouppedData[i][j].type === 'users' && count === 0) {
                grouppedData[i].splice(j, 0, {
                    label: 'Users',
                    value: 'title',
                    type: 'title',
                });
                count = 1;
            }
            formattedOptions.push(grouppedData[i][j]);
        }
    }
    return formattedOptions;
};

/* custon indicator */
const IndicatorsContainer = (props: any) => {
    const { handleClick } = props.selectProps;
    return (
        <div className="pr-2">
            <components.IndicatorsContainer {...props}>
                <button 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-150" 
                    onMouseDown={handleClick}
                >
                    <i className="fe-search text-gray-500"></i>
                </button>
            </components.IndicatorsContainer>
        </div>
    );
};

/* custom menu list */
const MenuList = (props: any) => {
    const { options } = props.selectProps;

    return (
        <components.MenuList {...props} className="rounded-lg shadow-lg border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200">
                <h5 className="text-sm font-medium text-gray-700">
                    Found {options.length < 10 ? ('0' + options.length).slice(-2) : options.length} results
                </h5>
            </div>
            <div className="py-2">
                {props.children}
            </div>
        </components.MenuList>
    );
};

/* fomates the option label */
const handleFormatOptionLabel = (option: SearchOptions) => {
    const formattedOption = optionGetter(option);
    return <div>{formattedOption}</div>;
};

const TopbarSearch = ({ options }: TopbarSearchProps) => {
    return (
        <Select
            components={{ IndicatorsContainer, MenuList }}
            placeholder={'Search...'}
            options={formateOptions(options)}
            formatOptionLabel={handleFormatOptionLabel}
            isOptionDisabled={(option) => option.type === 'title'}
            maxMenuHeight={350}
            isSearchable
            isClearable
            name="search-app"
            className="min-w-[300px]"
            classNamePrefix="react-select"
            styles={{
                control: (base) => ({
                    ...base,
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: 'none',
                    '&:hover': {
                        border: '1px solid #d1d5db',
                    },
                }),
                menu: (base) => ({
                    ...base,
                    overflow: 'hidden',
                    borderRadius: '0.5rem',
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: 'transparent',
                    padding: 0,
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }),
            }}
        />
    );
};

export default TopbarSearch;
