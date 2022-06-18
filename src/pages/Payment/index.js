import * as React from 'react'
import classNames from 'classnames/bind'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Filter3TwoToneIcon from '@mui/icons-material/Filter3TwoTone';
import Filter2TwoToneIcon from '@mui/icons-material/Filter2TwoTone';
import Filter1TwoToneIcon from '@mui/icons-material/Filter1TwoTone';
import TabPanel from './TabPanel'
import Pick from './Pick'

const styles = {
    textTab: {
        fontSize: '1em',
        textTransform: "none"
    }
}



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function Payment() {
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: '100%', fontSize: '2rem' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant='fullWidth' value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab  sx={styles.textTab} label="Chọn sản phẩm" icon={<Filter1TwoToneIcon fontSize='large'/>} {...a11yProps(0)} />
                    <Tab sx={styles.textTab} label="Nhập thông tin thanh toán" icon={<Filter2TwoToneIcon fontSize='large'/>} {...a11yProps(1)} />
                    <Tab sx={styles.textTab} label="Thanh toán thành công" icon={<Filter3TwoToneIcon fontSize='large'/>} {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Pick/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </Box>
    )
}
