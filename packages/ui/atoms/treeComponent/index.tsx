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

export const TreeComponent = (props: TreeComponentProps): JSX.Element => {
  const { className = '', sx = {}, data = [], checkboxsection = false, ...rest } = props;

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
        {data.map((book: any) => (
          <StyledTreeItem
            rootNode
            key={book.title}
            nodeId={book.title}
            // label={book.title}
            label={
              <CustomLabel
                labelText={book.mainTitle}
                iconProp={<SettingIcon />}
                fontsize={{ fontSize: '14px', fontWeight: 600 }}
              />
            }
            // icon={<SettingIcon />}
          >
            <StyledTreeItem
              sx={treeComponentStyle.child}
              nodeId={`${book.title}-titleone`}
              label={
                <CustomLabel
                  labelText={book.title}
                  iconProp={<InfoIcon />}
                  fontsize={{ fontSize: '14px', fontWeight: 500 }}
                />
              }
              // icon={<InfoIcon />}
            >
              <StyledTreeItem
                nodeId={`${book.title}-subTitle`}
                label={
                  <CustomLabel
                    labelText={book.subTitle}
                    fontsize={{ fontSize: '14px', fontWeight: 500, color: '#818181', margin: '7px' }}
                    checkBox={checkboxsection && true}
                  />
                }
              />
              <StyledTreeItem
                nodeId={`${book.title}-content`}
                label={
                  <CustomLabel
                    labelText={book.content}
                    fontsize={{ fontSize: '14px', fontWeight: 500, color: '#818181', margin: '7px' }}
                    checkBox={checkboxsection && true}
                  />
                }
              />
              {checkboxsection && <Box sx={treeComponentStyle.mild}></Box>}
            </StyledTreeItem>

            <StyledTreeItem
              sx={treeComponentStyle.child}
              nodeId={`${book.title}-secondTitle`}
              label={
                <CustomLabel
                  labelText={book.secondTitle}
                  iconProp={<InfoIcon />}
                  fontsize={{ fontSize: '14px', fontWeight: 500 }}
                />
              }
              // icon={<InfoIcon />}
            >
              <StyledTreeItem
                nodeId={`${book.title}-secondSubTitle`}
                label={
                  <CustomLabel
                    labelText={book.secondSubTitle}
                    fontsize={{ fontSize: '14px', fontWeight: 500, color: '#818181', margin: '7px' }}
                    checkBox={checkboxsection && true}
                  />
                }
              />
              <StyledTreeItem
                nodeId={`${book.title}-secondContent`}
                label={
                  <CustomLabel
                    labelText={book.secondContent}
                    fontsize={{ fontSize: '14px', fontWeight: 500, color: '#818181', margin: '7px' }}
                    checkBox={checkboxsection && true}
                  />
                }
              />
              {checkboxsection && <Box sx={treeComponentStyle.mild}></Box>}
            </StyledTreeItem>
          </StyledTreeItem>
        ))}
      </TreeView>
    </Box>
  );
};
