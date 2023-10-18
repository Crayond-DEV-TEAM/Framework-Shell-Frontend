import { CollapseIcon, ExpandIcon, InfoIcon, SettingIcon } from '@atoms/icons';
import { TreeItem, TreeView, treeItemClasses } from '@mui/lab';
import { Box, Checkbox, SxProps, Theme, Typography, styled } from '@mui/material';
import { treeComponentStyle } from './style';

export interface TreeComponentProps {
  className?: string;
  sx?: SxProps<Theme>;
  data?: any;
  checkboxsection?: boolean;
  setEdit?: any;
  onChange?: () => void;
}

export interface StyledTreeItemProps {
  rootNode?: boolean;
}
export interface CustomLabelProps {
  iconProp?: any;
  labelText?: string;
  fontsize?: any;
  checkBox?: boolean;
  disable?: boolean;
  onChange?: () => void | undefined;
  nodes?: any;
  index?: number;
}

export const CustomLabel = (props: CustomLabelProps): JSX.Element => {
  const {
    iconProp = null,
    labelText = '',
    checkBox = false,
    fontsize,
    disable,
    onChange = () => false,
    nodes,
    index,
  } = props;
  const dem = nodes.allowed?.every((item: any) => typeof item === 'string');
  console.log(dem, 'dem');
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>{iconProp}</Box>
        <Typography sx={{ ...treeComponentStyle?.child, ...fontsize }}>{labelText}</Typography>
      </Box>
      {checkBox && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Checkbox
            style={{ marginRight: '17px' }}
            disabled={disable}
            onChange={(e) => {
              // debugger;
              const updatedAllowed = nodes?.allowed?.includes('create')
                ? [...nodes?.allowed].filter((item: any) => item !== 'create')
                : [...(nodes?.allowed ?? []), 'create'];

              onChange(e, 'create', updatedAllowed, index);
            }}
            checked={nodes.allowed?.includes('create') ? true : false}
          />
          <p>{nodes.allowed?.includes('create') ? true : false}</p>
          <Checkbox
            style={{ marginRight: '17px' }}
            disabled={disable}
            onChange={(e) => {
              // debugger;
              const updatedAllowed = nodes?.allowed?.includes('read')
                ? [...nodes?.allowed].filter((item: any) => item !== 'read')
                : [...(nodes?.allowed ?? []), 'read'];

              onChange(e, 'read', updatedAllowed, index);
            }}
            checked={nodes?.allowed?.includes('read') ? true : false}
          />
          <Checkbox
            style={{ marginRight: '17px' }}
            disabled={disable}
            onChange={(e) => {
              // debugger;
              const updatedAllowed = nodes?.allowed?.includes('update')
                ? [...nodes?.allowed].filter((item: any) => item !== 'update')
                : [...(nodes?.allowed ?? []), 'update'];

              onChange(e, 'create', updatedAllowed, index);
            }}
            checked={nodes?.allowed?.includes('update') ? true : false}
          />
          {/* <p>{JSON.stringify(nodes?.allowed)}</p> */}
          <Checkbox
            style={{ marginRight: '17px' }}
            disabled={disable}
            onChange={(e) => {
              // debugger;
              const updatedAllowed = nodes?.allowed?.includes('delete')
                ? [...nodes?.allowed].filter((item: any) => item !== 'delete')
                : [...(nodes?.allowed ?? []), 'delete'];

              onChange(e, 'delete', updatedAllowed, index);
            }}
            checked={nodes?.allowed?.includes('delete') ?? false}
          />
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
  }
};
const renderTree = (nodes: any, test: string, checkBox: any, setEdit: any, onChange: () => void, index: any) => (
  <StyledTreeItem
    rootNode={test === 'parent' ? true : false}
    key={nodes?.name}
    nodeId={`${nodes?.name}`}
    label={
      <CustomLabel
        labelText={nodes?.name}
        disable={setEdit}
        onChange={onChange}
        nodes={nodes}
        index={index}
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
    {Array.isArray(nodes?.child)
      ? nodes?.child.map((node: any, indexchild: number) =>
          renderTree(node, test + 'child', checkBox, setEdit, onChange, index + '-' + indexchild),
        )
      : null}
  </StyledTreeItem>
);

export const TreeComponent = (props: TreeComponentProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    data = [],
    checkboxsection = false,
    setEdit,
    onChange = () => false,
    ...rest
  } = props;
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
      {data.length > 0 ? (
        <TreeView
          defaultCollapseIcon={<ExpandIcon />}
          defaultExpandIcon={<CollapseIcon />}
          defaultParentIcon={<SettingIcon />}
          sx={{ height: 220, flexGrow: 1, m: 2 }}
        >
          {Array.isArray(data) &&
            data.map((val: any, index: number) => {
              return renderTree(val, 'parent', checkboxsection && true, setEdit, onChange, index);
            })}
        </TreeView>
      ) : (
        <Typography sx={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>No data found</Typography>
      )}
    </Box>
  );
};
