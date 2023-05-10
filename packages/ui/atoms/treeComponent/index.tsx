import { IconButton, SxProps, Theme, Checkbox } from '@mui/material';
import { Box, Typography } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import { styled } from '@mui/material/styles';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { treeComponentStyle } from './style';
import { CollapseIcon, ExpandIcon, InfoIcon, SettingIcon } from '@atoms/icons';
// import { Checkbox } from '@material-ui/core';

export interface TreeComponentProps {
  className?: string;
  sx?: SxProps<Theme>;
  data?: any;
  checkboxsection?: boolean;
}

export interface StyledTreeItemProps {
  rootNode?: boolean;
}
export interface CustomLabelProps {
  iconProp?: any;
  labelText?: string;
  fontsize?: any;
  checkBox?: boolean;
}

export const CustomLabel = (props: CustomLabelProps): JSX.Element => {
  const { iconProp = null, labelText = '', checkBox = false, fontsize } = props;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>{iconProp}</Box>
        <Typography sx={{ ...treeComponentStyle?.child, ...fontsize }}>{labelText}</Typography>
      </Box>
      {checkBox && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Checkbox style={{ marginRight: '17px' }} />
          <Checkbox style={{ marginRight: '17px' }} />
          <Checkbox style={{ marginRight: '17px' }} />
          <Checkbox style={{ marginRight: '17px' }} />
        </Box>
      )}
    </Box>
  );
};
const StyledTreeItem = styled(TreeItem)<StyledTreeItemProps>(({ rootNode }) => {
  return {
    position: 'relative',
    '&:before': {
      pointerEvents: 'none',
      content: '""',
      position: 'absolute',
      width: 20,
      left: -18,
      top: 18,
      borderBottom:
        // only display if the TreeItem is not root node
        !rootNode ? `2px solid #c1c1c1` : 'none',
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 16,
      paddingLeft: 18,
      borderLeft: `2px solid #c1c1c1`,
    },
    '& .MuiTreeItem-label': {
      color: '#29302B',
    },
    '& .MuiTreeItem-iconContainer': {
      // marginTop: '8px',
    },
    '& .MuiTreeItem-content': {
      // padding: '8px',
    },
  };
});
const styles = (id: string, checks: boolean) => {
  switch (id) {
    case 'parent':
      return {
        iconProp: <SettingIcon />,
        fontsize: { fontSize: '14px', fontWeight: 600 },
      };
    case 'parentchild':
      return {
        iconProp: <InfoIcon />,
        fontsize: { fontSize: '14px', fontWeight: 500 },
      };
    default:
      return {
        fontsize: { fontSize: '14px', fontWeight: 500, color: '#818181', margin: '7px' },
        checkBox: checks === true ? true : false,
      };
      break;
  }
};
const renderTree = (nodes: any, test: string, checkBox: any) => (
  <StyledTreeItem
    rootNode={test === 'parent' ? true : false}
    key={nodes?.name}
    nodeId={`${nodes?.name}`}
    label={
      <CustomLabel
        labelText={nodes?.name}
        // iconProp={<SettingIcon />}
        // fontsize={{ fontSize: '14px', fontWeight: 600 }}
        {...styles(test, checkBox)}
        // checkBox={checkBox}
      />
    }

    // You can add custom properties to each node as well
    // create={nodes?.create}
    // read={nodes?.read}
    // update={nodes?.update}
    // delete={nodes?.delete}
  >
    {Array.isArray(nodes?.child) ? nodes?.child.map((node: any) => renderTree(node, test + 'child', checkBox)) : null}
  </StyledTreeItem>
);

export const TreeComponent = (props: TreeComponentProps): JSX.Element => {
  const { className = '', sx = {}, data = [], checkboxsection = false, ...rest } = props;
  console.log(data);
  return (
    <Box
      sx={[
        {
          ...treeComponentStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <TreeView
        defaultCollapseIcon={<ExpandIcon />}
        defaultExpandIcon={<CollapseIcon />}
        defaultParentIcon={<SettingIcon />}
        sx={{ height: 220, flexGrow: 1, m: 2 }}
      >
        {Array.isArray(data) &&
          data.map((val: any, index: number) => {
            return renderTree(val, 'parent', checkboxsection && true);
          })}
      </TreeView>
    </Box>
  );
};
