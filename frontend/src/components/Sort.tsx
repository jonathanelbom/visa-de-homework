import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ActionType, useAppDispatch, useAppState } from "../AppProvider"

export const Sort = () => {
    const {sortedBy} = useAppState();
    const dispatch = useAppDispatch();

    return (
        <FormControl sx={{ minWidth: '120px'}} size="small">
            <InputLabel id="sorted-by-label">Sort by</InputLabel>
            <Select
                labelId="sorted-by-label"
                id="sorted-by"
                size="small"
                value={sortedBy}
                label="Sort by"
                sx={{textTransform: 'capitalize'}}
                onChange={({target}) => dispatch({
                        type: ActionType.SET_SORT,
                        value: target.value
                    })
                }
            >
                {['title', 'author', 'published', 'genre', 'updated'].map((key) => (
                    <MenuItem
                        sx={{textTransform: 'capitalize'}}
                        value={key}
                        key={key}
                    >{key}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}