import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function forceDownload(url, fileName){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}

const useStyles = makeStyles({
    mainRoot: {
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: 'center'    
    },
    root: {
        width: 300,
        height: 300,
        margin: "5px 5px"
    },
    media: {
        height: 160,
    },
});

const images = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.mainRoot}>
        {props.images.map(image => (
            <Card className={classes.root} key={image.id}>
                <CardActionArea onClick={() => window.open(image.src)}>
                    <CardMedia
                    className={classes.media}
                    image={image.src}
                    title={image.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {`${image.title.length > 27 ? image.title.substring(0, 27) + '..' : image.title || 'Sample Title'}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       {`Uploaded By ${image.uploader.length > 22 ? image.uploader.substring(0, 22) + '..' : image.uploader}`}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button 
                        size="small" 
                        color="primary" 
                        onClick={() => forceDownload(image.src, image.title)}>
                        Download
                    </Button>
                </CardActions>
            </Card>
        ))}
    </div>
  );
}

export default images